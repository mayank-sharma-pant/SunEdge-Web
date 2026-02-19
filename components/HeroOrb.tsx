"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { MeshDistortMaterial, Float, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";

function OrbitalRing({
    radius,
    tilt,        // euler angles that tilt the whole ring plane [x,y,z]
    speed,       // orbital speed (radians per second)
    ringColor,
    dotColor,
    dotOffset,   // starting angle offset (radians)
    tubeRadius = 0.004,
}: {
    radius: number;
    tilt: [number, number, number];
    speed: number;
    ringColor: string;
    dotColor: string;
    dotOffset: number;
    tubeRadius?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);         // the whole ring+dot group
    const dotRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    // Pre-build the local-space axes from the tilt so dots orbit in the ring plane
    const euler = useMemo(() => new THREE.Euler(...tilt), [tilt]);
    const quaternion = useMemo(() => new THREE.Quaternion().setFromEuler(euler), [euler]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const angle = t * speed + dotOffset;

        // Orbit position in LOCAL ring plane (XY plane)
        const localX = Math.cos(angle) * radius;
        const localY = Math.sin(angle) * radius;
        const localPos = new THREE.Vector3(localX, localY, 0);

        // Rotate into world space using the same quaternion as the ring group
        localPos.applyQuaternion(quaternion);

        if (dotRef.current) {
            dotRef.current.position.copy(localPos);
        }
        if (lightRef.current) {
            lightRef.current.position.copy(localPos);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Visible ring torus — tilted in world space */}
            <group rotation={tilt}>
                <mesh>
                    <torusGeometry args={[radius, tubeRadius, 16, 128]} />
                    <meshBasicMaterial color={ringColor} transparent opacity={0.35} />
                </mesh>
            </group>

            {/* Satellite dot — position computed per-frame in useFrame above */}
            <mesh ref={dotRef}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshBasicMaterial color={dotColor} />
            </mesh>

            {/* Glow emanating from dot */}
            <pointLight ref={lightRef} intensity={0.6} distance={3} color={dotColor} />
        </group>
    );
}

// ──────────────────────────────────────────────────────────
// MainSphere — shape-shifts, rotates (self-rotation), and
// slowly revolves its whole body around the Y-axis (revolution)
// ──────────────────────────────────────────────────────────
function MainSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (meshRef.current) {
            // ── Self rotation (spin on its own axis) ──
            meshRef.current.rotation.y = t * 0.06; // Much slower for enterprise feel
            meshRef.current.rotation.x = Math.sin(t * 0.08) * 0.04;

            // ── Slow revolution around Y (orbit-like full body orbit) ──
            const rev = t * 0.04; // Slower orbital motion
            const orbitRadius = 0.15;
            meshRef.current.position.x =
                Math.cos(rev) * orbitRadius + currentPos.current.x;
            meshRef.current.position.z = Math.sin(rev) * orbitRadius;
            meshRef.current.position.y = currentPos.current.y;

            // ── Cursor parallax ──
            const pointer = state.pointer;
            targetPos.current.x = pointer.x * 0.25;
            targetPos.current.y = pointer.y * 0.18;
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.025;
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.025;

            // ── Breathing pulse ──
            const breathe = 1.0 + Math.sin(t * 0.6) * 0.018 + Math.sin(t * 1.9) * 0.006;
            meshRef.current.scale.setScalar(breathe);
        }

        // ── Shape-shifting: distort cycles strongly between values ──
        if (materialRef.current) {
            // ~12s cycle for strong morphing
            materialRef.current.distort =
                0.28 + Math.sin(t * 0.3) * 0.18 + Math.sin(t * 0.7) * 0.05;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1.4, 128, 128]}>
            <MeshDistortMaterial
                ref={materialRef}
                color="#c8d8ff"
                speed={1.2}
                distort={0.28}
                radius={1}
                transmission={0.95}
                thickness={2.0}
                roughness={0.06}
                ior={1.65}
                clearcoat={1}
                clearcoatRoughness={0.1}
                attenuationColor="#5b6fff"
                attenuationDistance={2.0}
            />
        </Sphere>
    );
}

// ──────────────────────────────────────────────────────────
// Animated dynamic lighting
// ──────────────────────────────────────────────────────────
function AnimatedLights() {
    const purpleRef = useRef<THREE.PointLight>(null);
    const blueRef = useRef<THREE.PointLight>(null);
    const rimRef = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (purpleRef.current) {
            purpleRef.current.intensity = 1.2 + Math.sin(t * 0.5) * 0.5;
            purpleRef.current.position.x = 10 + Math.sin(t * 0.2) * 4;
            purpleRef.current.position.y = 5 + Math.cos(t * 0.18) * 3;
        }
        if (blueRef.current) {
            blueRef.current.intensity = 1.0 + Math.sin(t * 0.35 + 1.5) * 0.4;
        }
        if (rimRef.current) {
            rimRef.current.intensity = 0.7 + Math.sin(t * 0.7) * 0.35;
        }
    });

    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight ref={purpleRef} position={[10, 8, 8]} intensity={1.4} color="#7B5CFF" />
            <pointLight ref={blueRef} position={[-10, -5, -10]} intensity={1.0} color="#38B6FF" />
            <pointLight ref={rimRef} position={[0, 10, -14]} intensity={0.9} color="#60a0ff" />
        </>
    );
}

// ──────────────────────────────────────────────────────────
// HeroOrb — main export
// 3 orbital rings, each with a satellite that travels ON the ring
// ──────────────────────────────────────────────────────────
export default function HeroOrb() {
    const rings = useMemo(() => [
        {
            radius: 2.8,
            tilt: [Math.PI / 6, 0, Math.PI / 8] as [number, number, number],
            speed: 0.15, // Drastically slowed
            ringColor: "#7B5CFF",
            dotColor: "#a78bfa",
            dotOffset: 0,
            tubeRadius: 0.005,
        },
        {
            radius: 3.3,
            tilt: [-Math.PI / 4, Math.PI / 5, 0] as [number, number, number],
            speed: -0.08, // Slow and steady
            ringColor: "#38B6FF",
            dotColor: "#7dd3fc",
            dotOffset: Math.PI / 2,
            tubeRadius: 0.005,
        },
        {
            radius: 3.8,
            tilt: [Math.PI / 3, -Math.PI / 6, Math.PI / 4] as [number, number, number],
            speed: 0.06, // Almost static presence
            ringColor: "#FF4FD8",
            dotColor: "#f9a8d4",
            dotOffset: Math.PI,
            tubeRadius: 0.004,
        },
    ], []);

    return (
        <div className="w-full h-full relative group">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
                <AnimatedLights />

                <Float speed={0.4} rotationIntensity={0.08} floatIntensity={0.25}>
                    <MainSphere />

                    {rings.map((ring, i) => (
                        <OrbitalRing key={i} {...ring} />
                    ))}
                </Float>

                <Environment preset="city" />
            </Canvas>

            {/* Ambient glow backdrop */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-[10%] bg-purple-500/20 blur-[120px] rounded-full animate-[glow-breathe_4s_ease-in-out_infinite]" />
                <div className="absolute inset-[20%] bg-blue-500/15 blur-[100px] rounded-full animate-[glow-breathe_6s_ease-in-out_infinite_reverse]" />
            </div>
        </div>
    );
}
