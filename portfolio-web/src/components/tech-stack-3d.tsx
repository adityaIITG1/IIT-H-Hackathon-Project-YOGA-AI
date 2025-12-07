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

    useEffect(() => {
        if (!sceneRef.current) return;

        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;

        const engine = Engine.create();
        engineRef.current = engine;

        const width = sceneRef.current.clientWidth;
        const height = 400;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                wireframes: false,
                background: "transparent",
            },
        });

        // Boundaries
        const ground = Bodies.rectangle(width / 2, height + 30, width, 60, { isStatic: true, render: { fillStyle: "transparent" } });
        const leftWall = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true, render: { fillStyle: "transparent" } });
        const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true, render: { fillStyle: "transparent" } });

        // Skill Balls
        const balls = skills.map((skill) => {
            const radius = 30 + Math.random() * 20;
            return Bodies.circle(
                Math.random() * width,
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
                    label: skill.name, // Store name for custom rendering if needed (canvas text is tricky in simple matter render)
                }
            );
        });

        World.add(engine.world, [ground, leftWall, rightWall, ...balls]);

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
        World.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Click Handler for AI Integration
        Matter.Events.on(mouseConstraint, "mousedown", (event) => {
            const mousePosition = event.mouse.position;
            const bodies = Matter.Composite.allBodies(engine.world);
            const clickedBody = Matter.Query.point(bodies, mousePosition)[0];

            if (clickedBody && clickedBody.label) {
                const event = new CustomEvent("trigger-ai-chat", {
                    detail: { message: `Tell me about Aditya's experience with ${clickedBody.label}?` }
                });
                window.dispatchEvent(event);
            }
        });

        // Custom Rendering for Text (Hack to draw text on bodies)
        Matter.Events.on(render, "afterRender", () => {
            const context = render.context;
            context.font = "bold 12px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "white";

            balls.forEach((ball, index) => {
                const { x, y } = ball.position;
                context.save();
                context.translate(x, y);
                context.rotate(ball.angle);
                context.fillText(skills[index].name, 0, 0);
                context.restore();
            });
        });

        Engine.run(engine);
        Render.run(render);

        return () => {
            Render.stop(render);
            World.clear(engine.world, false);
            Engine.clear(engine);
            render.canvas.remove();
            render.canvas = null as any;
            render.context = null as any;
            render.textures = {};
        };
    }, []);

    return (
        <div className="w-full h-[400px] relative overflow-hidden rounded-2xl bg-white/5 border border-white/10">
            <div ref={sceneRef} className="w-full h-full" />
            <div className="absolute top-4 left-0 w-full text-center pointer-events-none">
                <p className="text-sm text-gray-400">Drag and throw the skills!</p>
            </div>
        </div>
    );
}
