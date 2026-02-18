"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
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

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            // Slow, cinematic rotation
            meshRef.current.rotation.y = t * 0.08;
        }
    });

    return (
        <Sphere ref={meshRef} args={[2.2, 100, 100]}>
            <MeshDistortMaterial
                color="#f5f5ff"
                // Very gentle distortion for a calm glass feel
                speed={0.35}
                distort={0.22}
                radius={1}
                transmission={1}
                thickness={1.3}
                roughness={0.12}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0.18}
                attenuationColor="#7B5CFF"
                attenuationDistance={3}
            />
        </Sphere>
    );
}

export default function HeroOrb() {
    const satellites = useMemo(() => [
        // Slow orbital drift for subtle micro‑motion
        { radius: 3.5, speed: 0.16, offset: 0, color: "#7B5CFF" },
        { radius: 4.2, speed: 0.12, offset: Math.PI / 2, color: "#38B6FF" },
        { radius: 3.8, speed: 0.2, offset: Math.PI, color: "#FF4FD8" }
    ], []);

    const rings = useMemo(() => [
        // Very slow rotation for data rings
        { radius: 3, rotation: [Math.PI / 4, 0, 0] as [number, number, number], speed: 0.05, color: "#7B5CFF" },
        { radius: 3.2, rotation: [-Math.PI / 3, 0.5, 0] as [number, number, number], speed: -0.04, color: "#38B6FF" }
    ], []);

    return (
        <div className="w-full h-full relative group">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                {/* Soft, diffused lighting for a premium glass orb */}
                <ambientLight intensity={0.35} />
                <pointLight position={[10, 10, 10]} intensity={0.9} color="#7B5CFF" />
                <pointLight position={[-10, -5, -10]} intensity={0.7} color="#38B6FF" />

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

            {/* Soft, static glow backdrop – no flashing/pulsing */}
            <div className="absolute inset-0 bg-blue-500/15 blur-[140px] rounded-full opacity-20 pointer-events-none" />
        </div>
    );
}
