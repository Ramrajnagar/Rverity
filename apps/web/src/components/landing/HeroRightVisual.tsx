"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    Icosahedron,
    MeshDistortMaterial,
    MeshTransmissionMaterial,
    Octahedron,
    Sphere,
    Torus,
    Sparkles,
    PerspectiveCamera,
    Stars
} from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function AdvancedHyperCore() {
    const mainGroupRef = useRef<THREE.Group>(null); // Main container for the whole machine
    const meshRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Group>(null);

    // Generate random values once using useMemo to avoid purity violations
    const satelliteNodes = useMemo(() => {
        return Array.from({ length: 6 }, () => ({
            speed: 3 + Math.random(),
            position: [
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8
            ] as [number, number, number]
        }));
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const { x, y } = state.pointer; // Mouse position (-1 to 1)

        // ----------------------------------------------------
        // Interactive "Come Closer" Effect
        // ----------------------------------------------------
        if (mainGroupRef.current) {
            // Distance from center (0 to ~1.4)
            const dist = Math.sqrt(x * x + y * y);
            // Proximity factor: 1 = center, 0 = edge
            // We clamp it so it only activates when relatively close
            const proximity = Math.max(0, 1 - dist);

            // 1. Mangify/Scale Up
            const targetScale = 1 + (proximity * 0.6); // Scale up to 1.6x
            mainGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(mainGroupRef.current.scale.x, targetScale, 0.1));

            // 2. Move Closer (Z-axis)
            const targetZ = proximity * 2.5; // Move 2.5 units closer
            mainGroupRef.current.position.z = THREE.MathUtils.lerp(mainGroupRef.current.position.z, targetZ, 0.1);

            // 3. Look At Mouse (Parallax)
            const targetRotX = -y * 0.5;
            const targetRotY = x * 0.5;
            mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(mainGroupRef.current.rotation.x, targetRotX, 0.1);
            mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(mainGroupRef.current.rotation.y, targetRotY, 0.1);
        }

        // ----------------------------------------------------
        // Internal Animations (Spinning parts)
        // ----------------------------------------------------
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.2;
            meshRef.current.rotation.z = t * 0.1;
        }

        if (outerRef.current) {
            outerRef.current.rotation.x = t * 0.15;
            outerRef.current.rotation.y = t * 0.1;
        }

        if (innerRef.current) {
            innerRef.current.rotation.x = -t * 0.2;
            innerRef.current.rotation.z = t * 0.15;
        }

        if (ringRef.current) {
            ringRef.current.rotation.z = -t * 0.05;
        }
    });

    return (
        <group ref={mainGroupRef} dispose={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

                {/* 1. The Singularity - Dense Energy Core */}
                <mesh ref={meshRef} scale={1.2}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial
                        color="#a855f7"
                        emissive="#a855f7"
                        emissiveIntensity={3}
                        toneMapped={false}
                    />
                </mesh>

                {/* 2. Liquid Quantum Field - Distorted Sphere */}
                <Sphere args={[1.8, 64, 64]}>
                    <MeshDistortMaterial
                        color="#000000"
                        emissive="#10b981"
                        emissiveIntensity={0.5}
                        roughness={0}
                        metalness={1}
                        distort={0.3}
                        speed={1.5}
                    />
                </Sphere>

                {/* 3. Crystalline Containment - Glass Icosahedron */}
                <Icosahedron args={[2.5, 0]} ref={outerRef}>
                    <MeshTransmissionMaterial
                        roughness={0}
                        metalness={0.2}
                        transmission={0.6}
                        thickness={1.5}
                        color="#ffffff"
                        ior={1.5}
                        chromaticAberration={0.1}
                        transparent
                        opacity={0.5}
                    />
                </Icosahedron>

                {/* 4. High-Speed Data Rings */}
                <group ref={innerRef}>
                    <Torus args={[3.2, 0.03, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} toneMapped={false} />
                    </Torus>
                    <Torus args={[3.8, 0.02, 16, 100]} rotation={[0, Math.PI / 4, 0]}>
                        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} toneMapped={false} />
                    </Torus>
                </group>

                {/* 5. Outer Gyro Structure */}
                <group ref={ringRef}>
                    <Torus args={[4.5, 0.1, 8, 100]} rotation={[Math.PI / 3, 0, 0]}>
                        <meshStandardMaterial color="#1f1f1f" metalness={0.8} roughness={0.2} />
                    </Torus>
                </group>

                {/* 6. Particle Systems */}
                <Sparkles
                    count={120}
                    scale={8}
                    size={4}
                    speed={0.4}
                    opacity={0.6}
                    color="#a855f7"
                />
                <Sparkles
                    count={80}
                    scale={6}
                    size={3}
                    speed={0.8}
                    opacity={0.8}
                    color="#ffffff"
                />

                {/* Floating Satellite Nodes */}
                {satelliteNodes.map((node, i) => (
                    <Float key={i} speed={node.speed} rotationIntensity={2} floatIntensity={1}>
                        <Octahedron args={[0.2, 0]} position={node.position}>
                            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} toneMapped={false} />
                        </Octahedron>
                    </Float>
                ))}

            </Float>
        </group>
    );
}

export default function HeroRightVisual() {
    return (
        <div className="w-full h-full min-h-[400px] md:min-h-[600px] flex items-center justify-center pointer-events-auto">
            <Canvas gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} color="#a855f7" />
                <spotLight position={[-10, -10, -10]} angle={0.5} penumbra={1} intensity={2} color="#10b981" />
                <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />

                <AdvancedHyperCore />
            </Canvas>
        </div>
    );
}
