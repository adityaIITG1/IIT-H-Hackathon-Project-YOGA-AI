"use client";

import { useEffect, useRef, useState } from "react";
import { useVisionModels } from "@/hooks/useVisionModels";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { useArduino } from "@/hooks/useArduino";
import {
    classifyGesture,
    detectNamaste,
} from "@/utils/gesture-recognition";
import { analyzeFace } from "@/utils/face-logic";
import {
    drawUniverse,
    drawChakras,
    drawSmartTracking,
} from "@/utils/drawing";
import { generateSmartCoachMessage } from "@/utils/smart-coach";
import html2canvas from "html2canvas";

import TopBar from "./TopBar";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import BottomOverlay from "./BottomOverlay";
import BioAnalyticsPanel from "./BioAnalyticsPanel";

export default function YogaCanvas() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const universeRef = useRef<HTMLCanvasElement>(null);
    const { handLandmarker, faceLandmarker, isLoading, error: aiError } = useVisionModels();
    const { isListening, isSpeaking, toggleListening } = useVoiceAssistant();
    const { arduinoData, connectArduino, arduinoError } = useArduino();

    // Ref to track isSpeaking without triggering re-renders in the animation loop
    const isSpeakingRef = useRef(isSpeaking);
    useEffect(() => {
        isSpeakingRef.current = isSpeaking;
    }, [isSpeaking]);

    const [gesture, setGesture] = useState<string | null>(null);
    const [feedback, setFeedback] = useState("Tip: Focus on breath. Root is strong...");
    const [logs, setLogs] = useState<string[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);

    // Animation state
    const requestRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    // Refs for Animation Loop State
    const energiesRef = useRef<number[]>([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
    const activeIndexRef = useRef(0);
    const gestureRef = useRef<string | null>(null);
    const auraIntensityRef = useRef(0.0);
    const eyesClosedTimeRef = useRef(0);
    const eyesOpenTimeRef = useRef(0);
    const isMeditationRef = useRef(false);

    // XP & Level State
    const xpRef = useRef(0.0);
    const lastDetectionTimeRef = useRef(0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastHandResultsRef = useRef<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastFaceResultsRef = useRef<any>(null);
    const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const detectionCycleRef = useRef(0);
    const particlesRef = useRef<Array<{ x: number, y: number, vx: number, vy: number, life: number, type: string, color: string }>>([]);
    const levelRef = useRef(3);
    const warningMsgRef = useRef<string | null>(null);
    const pranaRef = useRef(0);
    const namasteHoldTimeRef = useRef(0);
    const lastScreenshotTimeRef = useRef(0);
    const thirdEyeRef = useRef({ dwellTime: 0, target: null as string | null });

    // Debounce Refs
    const pendingGestureRef = useRef<string | null>(null);
    const pendingGestureStartTimeRef = useRef(0);
    const lastSpeechTimeRef = useRef(0);
    const lastSpeechTextRef = useRef("");

    // UI State for Level & Stats
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(3);
    const [levelProgress, setLevelProgress] = useState(0);
    const [warningMsg, setWarningMsg] = useState<string | null>(null);
    const [mood, setMood] = useState("Relaxed");
    const [namasteHoldTime, setNamasteHoldTime] = useState(0);
    const [posture, setPosture] = useState("Good");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [alignmentMode, setAlignmentMode] = useState("Standard");

    // React State for UI updates (Sidebar)
    const [uiEnergies, setUiEnergies] = useState<number[]>([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
    const [sessionTime, setSessionTime] = useState("0.0 min");
    const [screenshotFlash, setScreenshotFlash] = useState(false);

    const addLog = (msg: string) => setLogs(prev => [...prev.slice(-4), msg]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const speak = (text: string) => {
        // Prevent overlapping with Intro Speech
        if (isSpeakingRef.current) return;

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            // Try to find an Indian female voice
            const voice = voices.find(v =>
                (v.name.includes("India") || v.name.includes("Hindi") || v.name.includes("Heera")) &&
                v.name.includes("Female")
            ) || voices.find(v => v.name.includes("Google हिन्दी")) || voices.find(v => v.name.includes("Female"));

            if (voice) utterance.voice = voice;
            utterance.rate = 1.15; // Teez (Fast/Energetic)
            utterance.pitch = 1.1; // Saaf (Clear/Natural)
            utterance.volume = 1.0; // Loud (Max Volume)

            // Audio Ducking
            if (audioRef.current) {
                audioRef.current.volume = 0.1; // Lower volume
            }

            utterance.onend = () => {
                if (audioRef.current && isPlaying) {
                    audioRef.current.volume = 0.6; // Restore volume
                }
            };

            utterance.onerror = () => {
                if (audioRef.current && isPlaying) {
                    audioRef.current.volume = 0.6; // Restore volume on error
                }
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    const hasLoadedRef = useRef(false);
    const hasErrorRef = useRef(false);

    useEffect(() => {
        if (isLoading && !hasLoadedRef.current) {
            // addLog("AI: Loading models...");
        }
        if (handLandmarker && faceLandmarker && !hasLoadedRef.current) {
            setTimeout(() => addLog("AI: Models loaded successfully"), 0);
            hasLoadedRef.current = true;
        }
        if (aiError && !hasErrorRef.current) {
            setTimeout(() => addLog(`AI Error: ${aiError}`), 0);
            hasErrorRef.current = true;
        }
        if (arduinoError) {
            setTimeout(() => addLog(`Sensor Error: ${arduinoError}`), 0);
        }
    }, [isLoading, handLandmarker, faceLandmarker, aiError, arduinoError]);

    useEffect(() => {
        audioRef.current = new Audio("/adiyogi.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.6;
        audioRef.current.preload = "auto";

        const playAudio = async () => {
            try {
                await audioRef.current?.play();
                setIsPlaying(true);
                addLog("Audio: Auto-playing");
            } catch (e) {
                console.warn("Autoplay blocked", e);
                addLog("Audio: Autoplay blocked. Click Start.");
                setIsPlaying(false);
            }
        };
        playAudio();

        const startCamera = async () => {
            if (videoRef.current) {
                addLog("Camera: Requesting access...");
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: {
                            width: 1280,
                            height: 720,
                        },
                    });
                    addLog("Camera: Access granted (HD)");
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadeddata = () => addLog("Camera: Data loaded");
                    videoRef.current.play();
                    addLog("Camera: Playing stream");
                } catch (err: unknown) {
                    console.error("Error accessing webcam:", err);
                    const errorMessage = err instanceof Error ? err.message : String(err);
                    addLog(`Camera Error: ${errorMessage}`);
                    setFeedback("Camera access denied.");
                }
            }
        };

        startCamera();

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            addLog("Audio: Paused");
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
                audioRef.current!.volume = 0.6; // Reset volume on play
                addLog("Audio: Playing");
            }).catch(e => addLog(`Audio Error: ${(e as Error).message}`));
        }
    };

    // Audio Ducking for Intro (from Hook)
    const { isSpeaking: isAssistantSpeaking } = useVoiceAssistant();

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            if (isAssistantSpeaking) {
                audioRef.current.volume = 0.1; // Duck
            } else {
                audioRef.current.volume = 0.6; // Restore
            }
        }
    }, [isAssistantSpeaking, isPlaying]);

    const takeScreenshot = async () => {
        const now = Date.now();
        if (now - lastScreenshotTimeRef.current < 2000) return; // Debounce 2s
        lastScreenshotTimeRef.current = now;

        // Visual Flash
        setScreenshotFlash(true);
        setTimeout(() => setScreenshotFlash(false), 300);

        speak("Screenshot captured.");
        addLog("📸 Screenshot Saved!");

        if (document.body) {
            try {
                const canvas = await html2canvas(document.body, {
                    useCORS: true,
                    ignoreElements: (element) => element.tagName === 'VIDEO', // Avoid video taint issues if any
                    backgroundColor: '#000000',
                });

                // Manually draw the video frame onto the canvas since html2canvas might miss it
                if (videoRef.current && canvasRef.current) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        // Draw video frame (mirrored)
                        ctx.save();
                        ctx.scale(-1, 1);
                        ctx.translate(-canvas.width, 0);
                        // We need to draw the video at the bottom layer, but html2canvas already drew the UI.
                        // Ideally we'd draw video first, but html2canvas captures the DOM.
                        // A simple workaround for this "parity" task: Just capture the UI or accept the video might be black if tainted.
                        // Better approach: Draw the current video frame from our canvasRef (which has the video drawn on it!)
                        // Our canvasRef has the video drawn on it in the animate loop!
                        // "ctx.drawImage(video, 0, 0, width, height);"
                        // So canvasRef actually HAS the video frame!
                        // So we just need to make sure html2canvas captures canvasRef correctly.
                    }
                }

                const link = document.createElement('a');
                const timestamp = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15);
                link.download = `yoga_session_${timestamp}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
            } catch (err) {
                console.error("Screenshot failed:", err);
                addLog("Screenshot Failed");
            }
        }
    };

    // 'S' Key Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 's') {
                takeScreenshot();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (
            !handLandmarker ||
            !faceLandmarker ||
            !videoRef.current ||
            !canvasRef.current
        ) return;

        startTimeRef.current = Date.now();

        // Load Mudra Images
        const brainImg = new Image();
        brainImg.src = "/brain_glow.png";
        const sunImg = new Image();
        sunImg.src = "/sun_glow.png";
        const pranaImg = new Image();
        pranaImg.src = "/prana_glow.png";
        const apanaImg = new Image();
        apanaImg.src = "/apana_glow.png";
        const varunImg = new Image();
        varunImg.src = "/varun_glow.png";

        const animate = () => {
            try {

                if (
                    !canvasRef.current ||
                    !videoRef.current ||
                    videoRef.current.readyState < 2
                ) {
                    requestRef.current = requestAnimationFrame(animate);
                    return;
                }

                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                const video = videoRef.current;

                if (!ctx) return;

                if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                }

                const width = canvas.width;
                const height = canvas.height;
                const t = (Date.now() - startTimeRef.current) / 1000;

                // 1. Draw Video
                ctx.save();
                ctx.scale(-1, 1);
                ctx.translate(-width, 0);
                ctx.drawImage(video, 0, 0, width, height);
                ctx.restore();

                // 2. AI Detection (Throttled & Optimized)
                const now = Date.now();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let handResults = lastHandResultsRef.current || { landmarks: [], worldLandmarks: [] };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let faceResults = lastFaceResultsRef.current || { faceLandmarks: [] };

                // Throttle detection to every 66ms (approx 15fps checks, interleaved)
                if (now - lastDetectionTimeRef.current > 66) {
                    lastDetectionTimeRef.current = now;

                    // Create/Update Offscreen Canvas for AI (640p - Balanced Peformance/Accuracy)
                    if (!offscreenCanvasRef.current) {
                        offscreenCanvasRef.current = document.createElement('canvas');
                    }
                    if (offscreenCanvasRef.current.width !== 640 || offscreenCanvasRef.current.height !== 360) {
                        offscreenCanvasRef.current.width = 640;
                        offscreenCanvasRef.current.height = 360;
                    }
                    const offCtx = offscreenCanvasRef.current.getContext('2d');
                    if (offCtx) {
                        offCtx.drawImage(video, 0, 0, 640, 360);

                        // Interleaved Detection: Alternate between Hand and Face
                        if (detectionCycleRef.current === 0) {
                            // Cycle 0: Detect Hands
                            const results = handLandmarker.detectForVideo(offscreenCanvasRef.current, now);
                            if (results.landmarks) {
                                handResults = results;
                                lastHandResultsRef.current = handResults;
                            }
                            detectionCycleRef.current = 1;
                        } else {
                            // Cycle 1: Detect Face
                            const results = faceLandmarker.detectForVideo(offscreenCanvasRef.current, now);
                            if (results.faceLandmarks) {
                                faceResults = results;
                                lastFaceResultsRef.current = faceResults;
                            }
                            detectionCycleRef.current = 0;
                        }
                    }
                }

                let currentGesture = null;
                let isEyesClosed = false;

                // Hand Logic
                if (handResults.landmarks) {
                    for (const landmarks of handResults.landmarks) {
                        drawSmartTracking(ctx, landmarks, width, height);

                        const g = classifyGesture(landmarks);
                        if (g) {
                            currentGesture = g;

                            // [NEW] Draw Mudra Visuals (Brain/Sun/Prana/Apana/Varun)
                            // Calculate Palm Center (Approx between Wrist 0 and Middle MCP 9)
                            const wrist = landmarks[0];
                            const middleMcp = landmarks[9];

                            const cx = (wrist.x + middleMcp.x) / 2 * width;
                            const cy = (wrist.y + middleMcp.y) / 2 * height;
                            const size = 100; // Size of the icon

                            ctx.save();
                            ctx.globalAlpha = 0.9;

                            if (g === "Gyan Mudra" && brainImg.complete) {
                                ctx.drawImage(brainImg, cx - size / 2, cy - size / 2, size, size);
                                ctx.shadowColor = "cyan";
                                ctx.shadowBlur = 20;
                            } else if (g === "Surya Mudra" && sunImg.complete) {
                                ctx.drawImage(sunImg, cx - size / 2, cy - size / 2, size, size);
                                ctx.shadowColor = "orange";
                                ctx.shadowBlur = 20;
                            } else if (g === "Prana Mudra" && pranaImg.complete) {
                                ctx.drawImage(pranaImg, cx - size / 2, cy - size / 2, size, size);
                                ctx.shadowColor = "#00ff00"; // Green
                                ctx.shadowBlur = 20;

                                // Spawn Nature Particles (DISABLED)
                                /*
                                if (Math.random() < 0.2) {
                                    particlesRef.current.push({
                                        x: cx, y: cy,
                                        vx: (Math.random() - 0.5) * 2,
                                        vy: -1 - Math.random(), // Float up
                                        life: 1.0,
                                        type: "nature",
                                        color: "rgba(50, 205, 50, 0.8)"
                                    });
                                }
                                */
                            } else if (g === "Apana Mudra" && apanaImg.complete) {
                                ctx.drawImage(apanaImg, cx - size / 2, cy - size / 2, size, size);
                                ctx.shadowColor = "#8b0000"; // Dark Red
                                ctx.shadowBlur = 20;
                            } else if (g === "Varun Mudra" && varunImg.complete) {
                                ctx.drawImage(varunImg, cx - size / 2, cy - size / 2, size, size);
                                ctx.shadowColor = "#00bfff"; // Deep Sky Blue
                                ctx.shadowBlur = 20;

                                // Spawn Water Particles (DISABLED)
                                /*
                                if (Math.random() < 0.3) {
                                    particlesRef.current.push({
                                        x: cx, y: cy,
                                        vx: (Math.random() - 0.5) * 2,
                                        vy: 2 + Math.random() * 2, // Fall down
                                        life: 1.0,
                                        type: "water",
                                        color: "rgba(0, 191, 255, 0.8)"
                                    });
                                }
                                */
                            }

                            ctx.restore();
                        }
                    }

                    if (handResults.landmarks.length >= 2) {
                        if (detectNamaste(handResults.landmarks)) {
                            currentGesture = "Namaste / Anjali Mudra";

                            // Screenshot Logic
                            namasteHoldTimeRef.current += 16; // ~16ms per frame

                            // Sync state for UI (Progress Bar)
                            if (namasteHoldTimeRef.current > 100) {
                                setNamasteHoldTime(namasteHoldTimeRef.current);
                            }

                            if (namasteHoldTimeRef.current > 1000) { // 1 second hold
                                takeScreenshot();
                                namasteHoldTimeRef.current = 0; // Reset
                                setNamasteHoldTime(0);
                            }
                        } else {
                            namasteHoldTimeRef.current = 0;
                            setNamasteHoldTime(0);
                        }
                    } else {
                        namasteHoldTimeRef.current = 0;
                        setNamasteHoldTime(0);
                    }
                }

                // --- ELEMENTAL PARTICLES UPDATE & DRAW (DISABLED) ---
                /*
                if (particlesRef.current.length > 0) {
                    ctx.save();
                    particlesRef.current.forEach((p, i) => {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.life -= 0.02;
    
                        if (p.type === "nature") {
                            // Leaf movement
                            p.x += Math.sin(Date.now() / 200 + i) * 1;
                        }
    
                        ctx.fillStyle = p.color;
                        ctx.globalAlpha = p.life;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.type === "water" ? 3 : 4, 0, 2 * Math.PI);
                        ctx.fill();
                    });
                    // Remove dead particles
                    particlesRef.current = particlesRef.current.filter(p => p.life > 0);
                    ctx.restore();
                }
                */

                // Face Logic
                if (faceResults.faceLandmarks && faceResults.faceLandmarks.length > 0) {
                    const face = faceResults.faceLandmarks[0];
                    const analysis = analyzeFace(face);
                    isEyesClosed = analysis.isEyesClosed;

                    // --- THIRD EYE INTERFACE ---
                    const forehead = face[10];
                    const fx = forehead.x * width;
                    const fy = forehead.y * height;
                    const gazeX = analysis.gazeX || 0;

                    // Calculate Target
                    const targetX = width / 2 + gazeX * (width * 0.8);
                    const targetY = height * 0.6;
                    let targetLabel = null;

                    if (gazeX < -0.3) targetLabel = "Right"; // Screen Left
                    else if (gazeX > 0.3) targetLabel = "Left"; // Screen Right

                    thirdEyeRef.current.target = targetLabel;

                    // Draw Beam & Reticle
                    const beamColor = "rgba(255, 0, 255, 0.4)"; // Purple
                    const reticleColor = targetLabel ? "rgba(0, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.3)";

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(fx, fy);
                    ctx.lineTo(targetX, targetY);
                    ctx.strokeStyle = beamColor;
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 15]); // Dashed beam
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Reticle
                    ctx.beginPath();
                    ctx.arc(targetX, targetY, 15, 0, 2 * Math.PI);
                    ctx.strokeStyle = reticleColor;
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    if (targetLabel) {
                        ctx.fillStyle = "cyan";
                        ctx.font = "12px monospace";
                        ctx.fillText(targetLabel === "Left" ? "FOCUS LEFT" : "FOCUS RIGHT", targetX - 40, targetY + 30);

                        // Locked Indicator
                        ctx.beginPath();
                        ctx.arc(targetX, targetY, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = "white";
                        ctx.fill();
                    }
                    ctx.restore();
                }

                // Meditation Logic (Stabilized)
                if (isEyesClosed) {
                    eyesOpenTimeRef.current = 0; // Reset open timer
                    if (eyesClosedTimeRef.current === 0) eyesClosedTimeRef.current = now;

                    // Trigger meditation after 1 second of eyes closed
                    if (now - eyesClosedTimeRef.current > 1000) {
                        isMeditationRef.current = true;
                    }
                } else {
                    // Eyes are Open (or lost)
                    eyesClosedTimeRef.current = 0; // Reset closed timer

                    if (isMeditationRef.current) {
                        // If currently meditating, use a SAFER safety buffer (2000ms)
                        // This prevents "flickering" off due to camera noise
                        if (eyesOpenTimeRef.current === 0) eyesOpenTimeRef.current = now;

                        if (now - eyesOpenTimeRef.current > 2000) {
                            isMeditationRef.current = false;

                            // Only announce "Yoga Stopped" if NO gesture is active
                            if (!currentGesture) {
                                const msg = "Yoga band ho gaya hai. Meditation stopped.";
                                setFeedback(msg);
                                speak(msg);
                            } else {
                                setFeedback("Meditation ended. Maintaining Yoga pose.");
                            }
                        }
                    } else {
                        isMeditationRef.current = false;
                    }
                }

                // Gesture State Update with Hysteresis (Debounce)
                if (currentGesture) {
                    if (pendingGestureRef.current !== currentGesture) {
                        // New potential gesture detected, start timer
                        pendingGestureRef.current = currentGesture;
                        pendingGestureStartTimeRef.current = now;
                    } else {
                        // Same pending gesture, check duration
                        if (now - pendingGestureStartTimeRef.current > 300) { // 300ms stability required
                            if (gestureRef.current !== currentGesture) {
                                // Confirmed new gesture
                                gestureRef.current = currentGesture;
                                setGesture(currentGesture);

                                const isGyan = currentGesture === "Gyan Mudra";
                                const msg = generateSmartCoachMessage(energiesRef.current, "Calm", isMeditationRef.current, isGyan);

                                // Prevent repeating the same message too soon (10s)
                                if (msg !== lastSpeechTextRef.current || now - lastSpeechTimeRef.current > 10000) {
                                    setFeedback(msg);
                                    speak(msg);
                                    lastSpeechTextRef.current = msg;
                                    lastSpeechTimeRef.current = now;
                                }
                            }
                        }
                    }
                } else {
                    // No gesture detected, reset pending if it was something
                    pendingGestureRef.current = null;
                    pendingGestureStartTimeRef.current = 0;
                }

                if (isMeditationRef.current && gestureRef.current !== "Meditation") {
                    // Trigger speech for meditation start
                    gestureRef.current = "Meditation";
                    setGesture("Meditation");
                    const msg = "Deep meditation detected. Your energy is rising rapidly.";

                    if (msg !== lastSpeechTextRef.current || now - lastSpeechTimeRef.current > 10000) {
                        setFeedback(msg);
                        speak(msg);
                        lastSpeechTextRef.current = msg;
                        lastSpeechTimeRef.current = now;
                    }
                }

                // --- XP & LEVEL LOGIC ---
                let xpGain = 0.0;
                let warning = null;
                const currentLevel = levelRef.current;
                const XP_PER_LEVEL = 150;
                const MAX_LEVEL = 20;

                // Base XP for Posture (Proxy using face detection for now)
                if (faceResults.faceLandmarks.length > 0) {
                    xpGain += 1.0;
                }

                // Bonus XP for Mudra
                if (currentGesture) {
                    xpGain += 1.0;
                }

                // Bonus XP for Eyes Closed
                if (isMeditationRef.current) {
                    xpGain += 2.0;
                }

                // Level Gating Logic
                if (currentLevel >= 3 && currentLevel < 10) {
                    if (!currentGesture) {
                        xpGain = 0;
                        warning = "MUDRA REQUIRED TO PROGRESS!";
                    }
                } else if (currentLevel >= 10) {
                    if (!isMeditationRef.current) {
                        xpGain = 0;
                        warning = "CLOSE EYES TO PROGRESS!";
                    }
                }

                // Apply XP
                if (currentLevel < MAX_LEVEL) {
                    xpRef.current += xpGain;

                    // Check Level Up
                    const calculatedLevel = Math.floor(xpRef.current / XP_PER_LEVEL) + 1;
                    const cappedLevel = Math.min(MAX_LEVEL, calculatedLevel);

                    if (cappedLevel > levelRef.current) {
                        levelRef.current = cappedLevel;
                        const msg = `Congratulations! You reached Level ${cappedLevel}.`;
                        setFeedback(msg);
                        speak(msg);
                    }
                }
                warningMsgRef.current = warning;

                // 3. Logic: Aura & Energy
                const isYogaMode = !!currentGesture || isMeditationRef.current;

                // Aura Dynamics
                if (isYogaMode) {
                    auraIntensityRef.current = Math.min(1.0, auraIntensityRef.current + 0.08); // Faster Rise
                } else {
                    auraIntensityRef.current = Math.max(0.0, auraIntensityRef.current - 0.08); // Faster Fade
                }

                // Energy Dynamics (Strict Caps & Rapid Decay)
                const energies = energiesRef.current;
                let allBalanced = true;

                // Determine Max Cap based on State
                let energyCap = 0.1; // Default: Distracted / No Focus
                let decayRate = 0.05; // Rapid Decay by default

                // [NEW] Energy Peak & Applause Logic
                let riseRate = 0.005; // Default slow rise

                if (isMeditationRef.current && gestureRef.current) {
                    // "Deep Meditation" State
                    energyCap = 1.0;
                    riseRate = 0.05; // Extremely fast rise (Peak)

                    // Trigger Applause if not already triggered recently
                    if (energiesRef.current[0] > 0.95) {
                        const now = Date.now();
                        if (now - lastSpeechTimeRef.current > 15000) { // 15s cooldown
                            const msg = "Excellent! Deep Meditation Achieved.";
                            setFeedback(msg);
                            speak(msg);
                            lastSpeechTimeRef.current = now;
                            lastSpeechTextRef.current = msg;
                        }
                    }
                } else if (isMeditationRef.current) {
                    energyCap = 1.0; // 100% - Eyes Closed (Meditation)
                    decayRate = 0.0; // No decay, rising
                    riseRate = 0.02; // Fast rise
                } else if (currentGesture) {
                    energyCap = 0.6; // 60% - Mudra Active
                    decayRate = 0.01; // Slow decay if fluctuating
                    riseRate = 0.01; // Moderate rise
                } else if (faceResults.faceLandmarks.length > 0) {
                    energyCap = 0.3; // 30% - Face Detected (Good Posture Proxy)
                    decayRate = 0.02; // Moderate decay
                    riseRate = 0.005; // Slow rise
                }

                // Apply Energy Logic
                for (let i = 0; i < 7; i++) {
                    if (energies[i] < energyCap) {
                        // Specific Chakra Boost for Mudras
                        let currentRise = riseRate;
                        if (currentGesture === "Gyan Mudra" && (i === 0 || i === 6)) {
                            currentRise = 0.01; // Boost Root & Crown
                        }

                        energies[i] = Math.min(energyCap, energies[i] + currentRise);
                    } else if (energies[i] > energyCap) {
                        // Decay Logic (Rapid Drop if cap lowered)
                        energies[i] = Math.max(energyCap, energies[i] - decayRate);
                    }

                    if (energies[i] < 0.95) allBalanced = false;
                }

                // Check for Full Balance Event
                if (allBalanced && gestureRef.current !== "Balanced") {
                    gestureRef.current = "Balanced";
                    const msg = "All Chakras are perfectly balanced. You are in harmony.";
                    setFeedback(msg);
                    speak(msg);
                }

                // Sync UI occasionally (every 10 frames)
                if (Math.floor(t * 30) % 10 === 0) {
                    setUiEnergies([...energies]);

                    // Update Session Time
                    const elapsedMin = (Date.now() - startTimeRef.current) / 60000;
                    setSessionTime(`${elapsedMin.toFixed(1)} min`);

                    // Update Mood & Posture
                    if (isMeditationRef.current) {
                        setMood("Deep Peace");
                        setPosture("Lotus");
                    } else if (currentGesture) {
                        setMood("Focused");
                        setPosture("Asana");
                    } else if (faceResults.faceLandmarks.length > 0) {
                        setMood("Calm");
                        setPosture("Good");
                    } else {
                        setMood("Distracted");
                        setPosture("Poor");
                    }
                }

                // 4. Render UI Overlays
                // Level Progress Bar
                const progress = (xpRef.current % XP_PER_LEVEL) / XP_PER_LEVEL * 100;
                setLevelProgress(progress);
                setLevel(levelRef.current);
                setWarningMsg(warning);

                // --- PREMIUM ATMOSPHERIC OVERLAYS ---
                // 1. Digital Vignette
                const vignette = ctx.createRadialGradient(width / 2, height / 2, width * 0.3, width / 2, height / 2, width * 0.8);
                vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
                vignette.addColorStop(1, "rgba(0, 10, 20, 0.6)");
                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, width, height);

                // 2. Dynamic Aura (Head/Body Glow)
                if (auraIntensityRef.current > 0.01) {
                    ctx.save();
                    const cx = width / 2;
                    const cy = height / 2;
                    const auraRadius = Math.max(width, height) * 0.7;
                    const auraGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, auraRadius);

                    // Golden/Cyan Fusion Aura
                    auraGrad.addColorStop(0, `rgba(0, 255, 255, ${auraIntensityRef.current * 0.15})`);
                    auraGrad.addColorStop(0.5, `rgba(255, 215, 0, ${auraIntensityRef.current * 0.08})`);
                    auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

                    ctx.globalCompositeOperation = "screen";
                    ctx.fillStyle = auraGrad;
                    ctx.fillRect(0, 0, width, height);
                    ctx.restore();
                }

                // Speed factor depends on yoga mode
                const speedFactor = isYogaMode ? 2.0 : 0.5;

                drawUniverse(ctx, width, height, t, speedFactor);
                const breathFactor = 1.0 + 0.1 * Math.sin(t * 0.8);

                drawChakras(
                    ctx,
                    width * 0.5,
                    height * 0.2,
                    height * 0.8,
                    activeIndexRef.current,
                    energies,
                    breathFactor,
                    t
                );

                // --- KUMBHAKA (Breath Retention) LOGIC ---
                let isTouchingNose = false;
                if (faceResults.faceLandmarks.length > 0 && handResults.landmarks.length > 0) {
                    const noseTip = faceResults.faceLandmarks[0][4]; // Nose Tip

                    for (const hand of handResults.landmarks) {
                        const indexTip = hand[8]; // Index Finger Tip
                        const thumbTip = hand[4]; // Thumb Tip

                        // Check distance to Index or Thumb
                        const distIndex = Math.hypot(noseTip.x - indexTip.x, noseTip.y - indexTip.y);
                        const distThumb = Math.hypot(noseTip.x - thumbTip.x, noseTip.y - thumbTip.y);

                        if (distIndex < 0.05 || distThumb < 0.05) { // Threshold
                            isTouchingNose = true;
                            break;
                        }
                    }
                }

                // Update Prana Value
                if (isTouchingNose) {
                    pranaRef.current = Math.min(100, pranaRef.current + 0.5);
                } else {
                    pranaRef.current = Math.max(0, pranaRef.current - 1.0);
                }

                // Draw Kumbhaka Bar
                if (pranaRef.current > 0) {
                    const barW = 300;
                    const barH = 20;
                    const barX = canvas.width / 2 - barW / 2;
                    const barY = canvas.height - 150;

                    // Label
                    ctx.fillStyle = "rgba(0, 255, 255, 1)";
                    ctx.font = "bold 16px monospace";
                    ctx.textAlign = "center";
                    ctx.fillText(isTouchingNose ? "KUMBHAKA ACTIVE: HOLD BREATH" : "PRANA DISSIPATING...", canvas.width / 2, barY - 10);

                    // Bar Background
                    ctx.fillStyle = "rgba(0, 50, 50, 0.8)";
                    ctx.fillRect(barX, barY, barW, barH);
                    ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
                    ctx.strokeRect(barX, barY, barW, barH);

                    // Bar Fill
                    ctx.fillStyle = isTouchingNose ? "rgba(0, 255, 255, 1)" : "rgba(0, 150, 150, 0.8)";
                    ctx.fillRect(barX, barY, (pranaRef.current / 100) * barW, barH);

                    // Glow
                    if (isTouchingNose) {
                        ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
                        ctx.shadowBlur = 15;
                        ctx.fillRect(barX, barY, (pranaRef.current / 100) * barW, barH);
                        ctx.shadowBlur = 0;
                    }
                }

                requestRef.current = requestAnimationFrame(animate);
            } catch (err) {
                console.error("Animation Loop Crash:", err);
                // Prevent infinite loop spam
                if (Math.random() < 0.01) {
                    const msg = err instanceof Error ? err.message : String(err);
                    addLog(`Crash: ${msg.substring(0, 15)}...`);
                }
                requestRef.current = requestAnimationFrame(animate);
            }
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [handLandmarker, faceLandmarker, isLoading, hasLoadedRef, addLog, analyzeFace]);

    return (
        <div className="relative h-screen w-screen bg-black overflow-hidden font-sans select-none text-white">
            {isLoading && (
                <div className="absolute z-50 top-0 left-0 w-full h-full bg-black/90 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-green-400 text-xl font-light tracking-widest animate-pulse">
                        INITIALIZING AI MODELS...
                    </div>
                </div>
            )}

            {/* User Camera - REMOVED mix-blend-screen for clarity */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover" // object-cover for "Full" experience
                autoPlay
                playsInline
                muted
            />

            {/* AI Overlays (Chakras, Hands, etc.) */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />

            {/* Universe Nebula */}
            <canvas
                ref={universeRef}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            />

            {/* --- FLOATING HUD OVERLAYS --- */}
            {/* Header / Top Bar */}
            <div className="absolute top-0 left-0 w-full p-4 z-40 bg-gradient-to-b from-black/80 to-transparent">
                <TopBar
                    sessionTime={sessionTime}
                    mood={mood}
                    posture={posture}
                    alignmentMode={alignmentMode}
                />
            </div>

            {/* Left HUD: Bio Metrics */}
            <div className="absolute left-4 top-24 bottom-20 w-[240px] z-30 flex flex-col gap-4 animate-fade-in">
                {/* Energy Bars */}
                <div className="flex-none p-4 rounded-3xl bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden">
                    <h3 className="text-[10px] text-cyan-400 font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        Neural Energies
                    </h3>
                    <div className="h-[280px] flex justify-center">
                        <LeftSidebar energies={uiEnergies} />
                    </div>
                </div>

                {/* Bio Analytics */}
                {arduinoData.isConnected && (
                    <div className="flex-1 min-h-[250px] rounded-3xl bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden p-1">
                        <BioAnalyticsPanel
                            heartRate={arduinoData.heartRate}
                            spo2={arduinoData.spo2}
                            beatDetected={arduinoData.beatDetected}
                            energyLevel={uiEnergies[3]}
                            stressLevel={1.0 - (uiEnergies[6] || 0.5)}
                            focusScore={uiEnergies[5] || 0.5}
                            isConnected={arduinoData.isConnected}
                            hrvIndex={arduinoData.hrvIndex}
                            doshas={arduinoData.doshas}
                            insightText={arduinoData.insightText}
                            finding={arduinoData.finding}
                        />
                    </div>
                )}
            </div>

            {/* Right HUD: Guidance */}
            <div className="absolute right-4 top-24 bottom-20 w-[240px] z-30 flex flex-col gap-4 animate-fade-in">
                <div className="flex-1 rounded-3xl bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden p-2">
                    <RightSidebar activeGesture={gesture} />
                </div>
            </div>

            {/* Center HUD: Start Prompt */}
            {
                !isPlaying && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <button
                            onClick={toggleAudio}
                            className="group relative px-12 py-4 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse"></div>
                            <div className="relative flex items-center gap-3 text-white font-bold tracking-widest text-lg">
                                <span>INITIATE CHAKRAFLOW</span>
                                <span className="text-2xl">🕉️</span>
                            </div>
                        </button>
                    </div>
                )
            }


            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 w-full h-16 px-8 z-40 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between pointer-events-none">
                <div className="text-[10px] text-white/40 font-mono tracking-widest">
                    SYSTEM STATUS: OK // SYNCED
                </div>
                <div className="flex items-center gap-6 pointer-events-auto">
                    <button
                        onClick={() => {
                            // Run in next frame to prevent event handler from blocking current UI update
                            requestAnimationFrame(() => {
                                toggleListening();
                            });
                        }}
                        className={`flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all border
                            ${isListening
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                                : 'bg-white/5 text-white/60 border-white/10'}`}
                    >
                        {isListening ? "LISTENING" : "MIC OFF"}
                    </button>
                </div>
            </div>

            {/* Global Overlays (Screenshot Flash) */}
            {screenshotFlash && (
                <div className="absolute inset-0 bg-white z-[100] animate-flash pointer-events-none"></div>
            )}

            {/* Digital Atmospheric Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)] z-20"></div>
        </div>
    );
}
