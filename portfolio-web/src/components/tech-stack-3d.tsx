"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const skills = [
    { name: "Python", color: "#3776AB" },
    { name: "React", color: "#61DAFB" },
    { name: "Next.js", color: "#000000" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Tailwind", color: "#06B6D4" },
    { name: "Node.js", color: "#339933" },
    { name: "SQL", color: "#4479A1" },
    { name: "Azure", color: "#0078D4" },
    { name: "AWS", color: "#FF9900" },
    { name: "Docker", color: "#2496ED" },
    { name: "Git", color: "#F05032" },
    { name: "Framer", color: "#0055FF" },
    { name: "OpenAI", color: "#412991" },
    { name: "PyTorch", color: "#EE4C2C" },
    { name: "Pandas", color: "#150458" },
];

export function TechStack3D() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const renderRef = useRef<Matter.Render | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Get dimensions
        const width = sceneRef.current.clientWidth;
        const height = 400; // Fixed height from container

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                wireframes: false,
                background: "transparent",
                pixelRatio: window.devicePixelRatio, // Sharper rendering
            },
        });
        renderRef.current = render;

        // Create Boundaries
        const ground = Bodies.rectangle(width / 2, height + 30, width, 60, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });
        const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });
        const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, {
            isStatic: true,
            render: { fillStyle: "transparent" }
        });

        // Add walls to world
        World.add(engine.world, [ground, leftWall, rightWall]);

        // Create Skill Balls
        const balls = skills.map((skill) => {
            const radius = 30 + Math.random() * 20;
            return Bodies.circle(
                Math.random() * width * 0.8 + width * 0.1, // Keep within center 80% initially
                -Math.random() * 500 - 50, // Start above screen
                radius,
                {
                    restitution: 0.9, // Bounciness
                    friction: 0.005,
                    render: {
                        fillStyle: skill.color,
                        strokeStyle: "#ffffff",
                        lineWidth: 2,
                    },
                    label: skill.name,
                }
            );
        });

        World.add(engine.world, balls);

        // Mouse Control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });

        // Remove wheel scroll capture
        const mouseElement = mouse.element;
        // @ts-ignore - mousewheel is internal to Matter.js Mouse
        const mouseWheelHandler = mouse.mousewheel;
        if (mouseWheelHandler) {
            mouseElement.removeEventListener("mousewheel", mouseWheelHandler);
            mouseElement.removeEventListener("DOMMouseScroll", mouseWheelHandler);
        }

        World.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Click Handler
        Matter.Events.on(mouseConstraint, "mousedown", (event) => {
            const mousePosition = event.mouse.position;
            const bodies = Matter.Composite.allBodies(engine.world);
            const clickedBody = Matter.Query.point(bodies, mousePosition)[0];

            if (clickedBody && clickedBody.label) {
                const customEvent = new CustomEvent("trigger-ai-chat", {
                    detail: { message: `Tell me about Aditya's experience with ${clickedBody.label}?` }
                });
                window.dispatchEvent(customEvent);
            }
        });

        // Custom Rendering for Text
        Matter.Events.on(render, "afterRender", () => {
            const context = render.context;
            context.font = "bold 14px sans-serif";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "white";

            balls.forEach((ball, index) => {
                const { x, y } = ball.position;
                const angle = ball.angle;

                context.save();
                context.translate(x, y);
                context.rotate(angle);
                // Shadow for better visibility
                context.shadowColor = "rgba(0,0,0,0.5)";
                context.shadowBlur = 4;
                context.fillText(skills[index].name, 0, 0);
                context.restore();
            });
        });

        // Run
        Engine.run(engine);
        Render.run(render);

        // Resize Handler
        const handleResize = () => {
            if (!sceneRef.current || !renderRef.current || !engineRef.current) return;

            const newWidth = sceneRef.current.clientWidth;
            const newHeight = 400; // Keep fixed height consistent

            renderRef.current.canvas.width = newWidth;
            renderRef.current.canvas.height = newHeight;

            // Reposition boundaries
            Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 30 });
            Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 });
            // Left wall stays at -30

            // Update render bounds
            // @ts-ignore - bounds is writable in practice though typed weirdly sometimes
            renderRef.current.bounds.max.x = newWidth;
            // @ts-ignore
            renderRef.current.bounds.max.y = newHeight;
            renderRef.current.options.width = newWidth;
            renderRef.current.options.height = newHeight;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (renderRef.current) {
                Render.stop(renderRef.current);
                if (renderRef.current.canvas) {
                    renderRef.current.canvas.remove();
                }
            }
            if (engineRef.current) {
                Engine.clear(engineRef.current);
                World.clear(engineRef.current.world, false);
            }
        };
    }, []);

    return (
        <div className="w-full h-[400px] relative overflow-hidden rounded-2xl bg-white/5 border border-white/10">
            <div ref={sceneRef} className="w-full h-full" />
            <div className="absolute top-4 left-0 w-full text-center pointer-events-none select-none">
                <p className="text-sm text-gray-400">Drag and throw the skills!</p>
            </div>
        </div>
    );
}

