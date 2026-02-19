"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { MeshDistortMaterial, Float, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Satellite({ radius, speed, offset, color }: { radius: number, speed: number, offset: number, color: string }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed + offset;
        if (ref.current) {
            ref.current.position.set(
                Math.cos(t) * radius,
                Math.sin(t * 0.5) * (radius * 0.5),
                Math.sin(t) * radius
            );
        }
    });

    return (
        <group ref={ref}>
            <mesh>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>
            <pointLight intensity={0.5} distance={2} color={color} />
        </group>
    );
}

function DataRing({ radius, rotation, speed, color }: { radius: number, rotation: [number, number, number], speed: number, color: string }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        if (ref.current) {
            ref.current.rotation.z = t;
        }
    });

    return (
        <group rotation={rotation}>
            <mesh ref={ref}>
                <torusGeometry args={[radius, 0.005, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

function MainSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const { viewport } = useThree();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            // Cinematic rotation — slightly faster for energy feel
            meshRef.current.rotation.y = t * 0.12;
            meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;

            // Aggressive breathing pulse (1.0 → 1.02) — premium energy core feel
            const breathe = 1.0 + Math.sin(t * 0.6) * 0.015 + Math.sin(t * 1.8) * 0.005;
            meshRef.current.scale.setScalar(breathe);

            // Reactive inertia — disciplined cursor tracking
            const pointer = state.pointer;
            targetPos.current.x = pointer.x * 0.3;
            targetPos.current.y = pointer.y * 0.2;
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.025;
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.025;
            meshRef.current.position.x = currentPos.current.x;
            meshRef.current.position.y = currentPos.current.y;
        }

        // Dynamic distortion intensity — restrained
        if (materialRef.current) {
            materialRef.current.distort = 0.15 + Math.sin(t * 0.8) * 0.04;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1.4, 128, 128]}>
            <MeshDistortMaterial
                ref={materialRef}
                color="#e8e8ff"
                speed={0.5}
                distort={0.22}
                radius={1}
                transmission={1}
                thickness={1.5}
                roughness={0.08}
                ior={1.6}
                clearcoat={1}
                clearcoatRoughness={0.12}
                attenuationColor="#7B5CFF"
                attenuationDistance={2.5}
            />
        </Sphere>
    );
}

// Dramatic cinematic lighting — aggressive intensity shifts
function AnimatedLights() {
    const purpleRef = useRef<THREE.PointLight>(null);
    const blueRef = useRef<THREE.PointLight>(null);
    const rimRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (purpleRef.current) {
            purpleRef.current.intensity = 1.0 + Math.sin(t * 0.5) * 0.4;
            purpleRef.current.position.x = 10 + Math.sin(t * 0.2) * 3;
        }
        if (blueRef.current) {
            blueRef.current.intensity = 0.8 + Math.sin(t * 0.35 + 1.5) * 0.35;
        }
        if (rimRef.current) {
            rimRef.current.intensity = 0.6 + Math.sin(t * 0.7) * 0.3;
        }
    });

    return (
        <>
            <ambientLight intensity={0.25} />
            <pointLight ref={purpleRef} position={[10, 10, 10]} intensity={1.2} color="#7B5CFF" />
            <pointLight ref={blueRef} position={[-10, -5, -10]} intensity={0.9} color="#38B6FF" />
            {/* Dramatic rim light — back-lighting for cinematic depth */}
            <pointLight ref={rimRef} position={[0, 8, -12]} intensity={0.8} color="#FF4FD8" />
        </>
    );
}

export default function HeroOrb() {
    const satellites = useMemo(() => [
        { radius: 3.5, speed: 0.16, offset: 0, color: "#7B5CFF" },
        { radius: 4.2, speed: 0.12, offset: Math.PI / 2, color: "#38B6FF" },
        { radius: 3.8, speed: 0.2, offset: Math.PI, color: "#FF4FD8" }
    ], []);

    const rings = useMemo(() => [
        { radius: 3, rotation: [Math.PI / 4, 0, 0] as [number, number, number], speed: 0.05, color: "#7B5CFF" },
        { radius: 3.2, rotation: [-Math.PI / 3, 0.5, 0] as [number, number, number], speed: -0.04, color: "#38B6FF" }
    ], []);

    return (
        <div className="w-full h-full relative group">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                <AnimatedLights />

                <Float speed={0.5} rotationIntensity={0.12} floatIntensity={0.3}>
                    <MainSphere />

                    {rings.map((ring, i) => (
                        <DataRing key={i} {...ring} />
                    ))}

                    {satellites.map((sat, i) => (
                        <Satellite key={i} {...sat} />
                    ))}
                </Float>

                <Environment preset="city" />
            </Canvas>

            {/* Aggressive energy glow backdrop */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-[10%] bg-purple-500/20 blur-[120px] rounded-full animate-[glow-breathe_4s_ease-in-out_infinite]" />
                <div className="absolute inset-[20%] bg-blue-500/15 blur-[100px] rounded-full animate-[glow-breathe_6s_ease-in-out_infinite_reverse]" />
            </div>
        </div>
    );
}
