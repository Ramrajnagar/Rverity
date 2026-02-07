"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Float, Icosahedron, Torus, Octahedron, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function inSphere(array: Float32Array, options: { radius: number }) {
    const r = options.radius;
    for (let i = 0; i < array.length; i += 3) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const radius = Math.cbrt(Math.random()) * r;
        array[i] = radius * Math.sin(phi) * Math.cos(theta);
        array[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        array[i + 2] = radius * Math.cos(phi);
    }
    return array;
}

function ParticleField(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useMemo(() => {
        const data = inSphere(new Float32Array(6000), { radius: 10 });
        return [data];
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // Constant rotation
            ref.current.rotation.x -= delta / 30;
            ref.current.rotation.y -= delta / 40;

            // Mouse influence on the entire field (Parallax)
            const { x, y } = state.pointer;
            ref.current.rotation.x += y * 0.001;
            ref.current.rotation.y += x * 0.001;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#a855f7" // Electric Purple
                    size={0.015} // Slightly larger for sparkle
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function CyberneticMachine({ position = [2.5, 0, 0] }: { position?: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    // Mouse interaction state
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const { x, y } = state.pointer; // Mouse position (-1 to 1)

        if (groupRef.current) {
            // Aggressive Rotation towards mouse
            const targetRotX = -y * 0.8; // Looking up/down
            const targetRotY = x * 0.8;  // Looking left/right

            // Smooth Rotation
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);

            // Parallax Position Shift
            // Move slightly opposite to mouse to create depth
            // Use the base position passed via props
            const targetPosX = position[0] + (x * 0.5);
            const targetPosY = position[1] + (y * 0.5);

            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.1);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.1);
        }

        // Dynamic Light following mouse to create moving highlights
        if (lightRef.current) {
            lightRef.current.position.x = x * 10;
            lightRef.current.position.y = y * 10;
        }

        // Rotate Rings (Mechanical Animation)
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.5;
            ring1Ref.current.rotation.y = t * 0.2;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x = t * 0.3;
            ring2Ref.current.rotation.z = Math.cos(t * 0.5) * 0.5;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.x = t * -0.4;
            ring3Ref.current.rotation.y = t * 0.1;
        }

        // Pulse Core
        if (coreRef.current) {
            // Pulse scale
            const pulse = 1 + Math.sin(t * 4) * 0.1;
            coreRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <>
            <group ref={groupRef} position={position as any}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

                    {/* 1. Reactor Core: Glass Shell */}
                    <Icosahedron args={[1, 0]} ref={coreRef}>
                        <MeshTransmissionMaterial
                            color="#ffffff"
                            transmission={0.95}
                            opacity={1}
                            metalness={0.5}
                            roughness={0}
                            ior={1.5}
                            thickness={2}
                            chromaticAberration={0.1} // Now valid!
                            emissive="#a855f7"
                            emissiveIntensity={0.2}
                        />
                    </Icosahedron>

                    {/* Inner Energy Source */}
                    <Sphere args={[0.5, 32, 32]}>
                        <meshBasicMaterial color="#10b981" toneMapped={false} />
                    </Sphere>
                    <pointLight distance={3} intensity={4} color="#10b981" />

                    {/* 2. Gyroscopic Ring 1 (Outer - Heavy Metal) */}
                    <Torus args={[2.8, 0.1, 8, 100]} ref={ring1Ref}>
                        <meshStandardMaterial color="#333333" metalness={1} roughness={0.2} />
                    </Torus>

                    {/* 3. Gyroscopic Ring 2 (Middle - Glowing Neon) */}
                    <Torus args={[2.2, 0.05, 16, 100]} ref={ring2Ref}>
                        <meshStandardMaterial color="#a855f7" metalness={0.5} roughness={0.1} emissive="#a855f7" emissiveIntensity={2} toneMapped={false} />
                    </Torus>

                    {/* 4. Gyroscopic Ring 3 (Inner - Chrome) */}
                    <Torus args={[1.7, 0.15, 16, 50]} ref={ring3Ref}>
                        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
                    </Torus>

                    {/* 5. Floating Shards (Data Bits) */}
                    <group>
                        {[...Array(12)].map((_, i) => (
                            <Float key={i} speed={3 + Math.random()} rotationIntensity={2} floatIntensity={2}>
                                <Octahedron args={[0.15, 0]} position={[
                                    (Math.random() - 0.5) * 6,
                                    (Math.random() - 0.5) * 6,
                                    (Math.random() - 0.5) * 6
                                ]}>
                                    <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} toneMapped={false} />
                                </Octahedron>
                            </Float>
                        ))}
                    </group>

                </Float>
            </group>

            {/* Dynamic Light controlled by mouse */}
            <pointLight ref={lightRef} distance={20} intensity={5} color="#ffffff" />
        </>
    );
}

function Rig() {
    useFrame((state) => {
        const { x, y } = state.pointer;
        // Subtle camera swaying based on mouse
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 0.5, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.5, 0.05);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

interface NeuralBackgroundProps {
    machinePositions?: [number, number, number][];
}

export default function NeuralBackground({ machinePositions = [[2.5, 0, 0]] }: NeuralBackgroundProps) {
    return (
        <div className="absolute inset-0 z-0 h-full w-full bg-[#050209] overflow-hidden">
            {/* Deep Space Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" />

            <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

                {/* Back Light for rim effect */}
                <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={2} color="#a855f7" />

                <ParticleField />
                {machinePositions.map((pos, i) => (
                    <CyberneticMachine key={i} position={pos} />
                ))}
                <Rig />
            </Canvas>
        </div>
    );
}
