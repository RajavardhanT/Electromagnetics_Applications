---
layout: default
title: Computational Methods — CUDA, GPU Computing & Julia
---

# Computational Methods

Modern electromagnetics, quantum sensing, plasma physics, optimization, inverse problems, and large numerical models are often limited not by the governing equations but by the computational cost of solving them. This page is a practical reference to scientific computing methods, with special emphasis on **GPU acceleration with NVIDIA CUDA** and the **Julia programming language**.

## 1. The scientific-computing stack

A useful hierarchy is

**physical model → discretization → numerical algorithm → linear algebra → parallel implementation → hardware**

For electromagnetics this can mean

**Maxwell equations → FDTD/FEM/MoM → sparse or dense matrix operations → CPU/GPU → fields and observables**.

For quantum sensing it can mean

**Hamiltonian/master equation → matrix construction → eigensolver or ODE solver → parameter sweep → spectra and observables**.

The largest speed gains usually come from improving the algorithm first and then mapping the expensive, parallel portion efficiently onto hardware.

---

# CUDA and GPU scientific computing

## 2. What CUDA is

**CUDA (Compute Unified Device Architecture)** is NVIDIA's parallel-computing platform and programming model for executing general-purpose calculations on NVIDIA GPUs.

A CPU contains a relatively small number of powerful cores optimized for low-latency and general control flow. A GPU contains many execution units designed for high-throughput parallel work. Scientific problems become attractive GPU targets when the same operation can be applied to many data elements simultaneously.

A simple conceptual comparison is:

| CPU | GPU |
|---|---|
| Few powerful cores | Many parallel execution units |
| Excellent serial/control performance | Excellent data-parallel throughput |
| Large caches and sophisticated branching | High aggregate memory bandwidth |
| Good for orchestration and irregular algorithms | Good for large regular numerical kernels |

The goal is therefore not simply **GPU = faster CPU**. The algorithm must expose enough parallelism.

## 3. CUDA execution model

A CUDA function executed on the GPU is called a **kernel**. A kernel is launched using many threads.

The hierarchy is

**grid → thread blocks → threads**.

Threads within a block can cooperate through fast shared memory and synchronization. At the hardware level, threads are scheduled in groups called **warps**.

A typical numerical operation is

$$
C_i=A_i+B_i,
$$

where thousands or millions of values of $i$ can be evaluated concurrently.

For a three-dimensional FDTD grid, for example, different GPU threads can update electromagnetic-field components at different spatial cells.

## 4. Memory hierarchy

GPU performance is often limited by memory movement rather than floating-point arithmetic.

Important CUDA memory spaces include:

- **registers** — extremely fast, private to a thread;
- **shared memory** — fast on-chip memory shared within a thread block;
- **global memory** — large device memory but with higher latency;
- **constant/read-only caches** — useful for appropriate access patterns.

A central optimization principle is therefore:

$$
\boxed{\text{move data as little as possible and perform as much useful arithmetic as possible per transfer}}
$$

Memory coalescing, reuse through shared memory, minimizing unnecessary CPU–GPU transfers, and choosing suitable data layouts can matter as much as the mathematical kernel itself.

## 5. Important CUDA scientific libraries

The CUDA ecosystem includes optimized libraries that often eliminate the need to write low-level kernels:

| Library | Main purpose |
|---|---|
| **cuBLAS** | dense linear algebra / BLAS |
| **cuSPARSE** | sparse matrices |
| **cuSOLVER** | dense and sparse factorizations and solvers |
| **cuFFT** | fast Fourier transforms |
| **cuRAND** | random-number generation |
| **CUB / Thrust** | parallel primitives and algorithms |

For scientific work, using a mature optimized library is often preferable to writing a custom kernel.

## 6. Scientific applications of CUDA

### Computational electromagnetics

GPU acceleration is particularly natural for regular-grid methods such as FDTD:

$$
\nabla\times\mathbf E=-\mu\frac{\partial\mathbf H}{\partial t},
\qquad
\nabla\times\mathbf H=\mathbf J+\epsilon\frac{\partial\mathbf E}{\partial t}.
$$

Field updates occur repeatedly over large spatial grids, producing substantial parallelism.

GPU computing is also useful for FEM sparse linear algebra, Method-of-Moments matrix operations, FFT-based solvers, antenna-array calculations, inverse scattering, optimization, and Monte Carlo models.

### Quantum and atomic physics

Useful workloads include:

- Hamiltonian construction over large bases;
- diagonalization and eigensolvers;
- density-matrix and master-equation propagation;
- Floquet/Shirley calculations;
- parameter sweeps over electric field, magnetic field, detuning, polarization, or RF frequency;
- Monte Carlo atomic trajectories;
- Bayesian fitting and optimization.

For a density matrix,

$$
\dot{\rho}
=-\frac{i}{\hbar}[H,\rho]+\mathcal L(\rho),
$$

many parameter points or trajectories can often be evaluated independently. That form of **embarrassingly parallel** computation can map very effectively to GPUs.

### Particle and plasma simulation

Particle-in-cell and Monte Carlo calculations repeatedly evaluate forces and update large numbers of particles. For a charged particle,

$$
\frac{d\mathbf p}{dt}
=q(\mathbf E+\mathbf v\times\mathbf B).
$$

Each particle update can often be parallelized, making this closely connected to the [Lorentz-force](../lorentz-force/) material in this reference.

## 7. When CUDA gives large speedups

CUDA is attractive when a calculation has:

- many independent or weakly coupled operations;
- large matrices or arrays;
- repeated calculations on data already resident on the GPU;
- high arithmetic intensity;
- regular memory access;
- enough work to overcome kernel-launch and transfer overhead.

It may provide little benefit when the calculation is small, highly serial, branch-heavy, dominated by CPU–GPU transfers, or constrained by an algorithm that exposes little parallelism.

**Always benchmark the complete workflow rather than quoting a theoretical GPU speedup.**

## 8. Amdahl's law

If only a fraction $P$ of a calculation can be accelerated by a factor $S$, the overall speedup is

$$
S_{\rm total}=\frac{1}{(1-P)+P/S}.
$$

Even an extremely fast GPU kernel cannot eliminate a large serial fraction. This is why profiling is essential.

## 9. Numerical precision

Scientific computing commonly uses:

- FP64 — double precision;
- FP32 — single precision;
- FP16/BF16 and mixed precision — useful when the numerical problem tolerates lower precision.

Electromagnetic phase calculations, high-dynamic-range simulations, eigenvalue problems, and precision quantum models may require FP64. Reduced precision should therefore be justified by an error analysis rather than chosen only for throughput.

---

# Julia for scientific computing

## 10. Why Julia exists

Julia was designed around a difficult scientific-computing goal:

> retain the interactive productivity of a high-level dynamic language while allowing numerical code to compile to efficient machine code.

Julia uses type inference and just-in-time compilation through LLVM and makes **multiple dispatch** a central programming mechanism.

The language is particularly attractive when a project moves repeatedly between mathematical derivation, exploratory simulation, high-performance implementation, and visualization.

## 11. Multiple dispatch

In many object-oriented languages, method selection is organized mainly around one object. Julia can select a method using the types of **all** arguments.

Conceptually,

```julia
interaction(atom::Cesium, field::RFField)
interaction(atom::Cesium, field::MagneticField)
interaction(atom::Hydrogen, field::MicrowaveField)
```

can represent different physical interactions under the same conceptual operation.

This maps naturally onto scientific software, where the mathematical operation frequently depends on several physical or numerical types.

## 12. Julia arrays and numerical code

Julia syntax closely follows mathematical notation. For example,

```julia
A = rand(1000,1000)
x = rand(1000)
y = A*x
```

expresses a matrix-vector product directly.

Important principles for fast Julia include:

- use concrete, type-stable data structures;
- put performance-critical work inside functions;
- avoid unnecessary allocations;
- preallocate repeated work arrays;
- use broadcasting where appropriate;
- exploit optimized linear-algebra libraries;
- profile before optimizing.

## 13. Parallel computing in Julia

Julia supports several levels of parallelism:

**SIMD/vectorization → multithreading → distributed processes → GPU computing.**

This makes it possible to begin with a compact CPU implementation and progressively move expensive parts to parallel hardware.

## 14. Julia + CUDA

One of the most useful combinations is **Julia with CUDA.jl**.

The conceptual workflow becomes

$$
\text{Julia mathematical model}
\rightarrow
\text{GPU arrays/kernels}
\rightarrow
\text{CUDA hardware}.
$$

For suitable array-oriented code, moving data to a GPU array allows many high-level operations to execute on the GPU while remaining within Julia. More specialized applications can implement custom GPU kernels.

This combination is attractive for researchers who want GPU performance without making CUDA C++ the primary language of the entire scientific project.

## 15. Python, Julia and CUDA C++

These tools are complementary rather than mutually exclusive.

| Tool | Strength |
|---|---|
| **Python** | enormous scientific ecosystem, rapid prototyping, mature libraries |
| **Julia** | numerical language design, multiple dispatch, high-level code with compiled performance |
| **CUDA C++** | detailed GPU control and mature low-level CUDA ecosystem |
| **Julia + CUDA.jl** | high-level scientific programming with direct GPU acceleration |
| **Python + CUDA libraries** | highly productive when optimized libraries perform the expensive computation |

A sensible strategy is to choose the highest-level environment that meets the performance requirement and descend toward custom GPU kernels only when profiling shows that it is necessary.

## 16. Relevance to electromagnetics and quantum sensing

For the kinds of calculations collected in this reference, a useful computational pipeline is:

$$
\boxed{
\text{Physics}
\rightarrow
\text{equations}
\rightarrow
\text{numerical discretization}
\rightarrow
\text{Julia/Python prototype}
\rightarrow
\text{profiling}
\rightarrow
\text{GPU acceleration}
}
$$

Examples include:

**FDTD:** parallel field updates over millions of cells.

**Antenna arrays:** parallel evaluation over direction, frequency, geometry, and excitation.

**Floquet/Shirley calculations:** parameter sweeps over RF field and frequency with repeated Hamiltonian construction/eigensolution.

**Density-matrix calculations:** parallel detuning, Rabi-frequency, magnetic-field, and polarization sweeps.

**Monte Carlo ion/electron transport:** many particle trajectories evaluated concurrently.

**Optimization/inverse problems:** repeated forward simulations distributed across CPU cores or GPUs.

The most important lesson is that **computational method and physical model should be designed together**. Faster hardware does not compensate for a poor discretization, badly conditioned system, unnecessary matrix construction, or an inefficient algorithm.

---

# Practical learning path

For scientific work, a useful progression is:

1. Learn numerical linear algebra, FFTs, ODE/PDE integration, sparse matrices, and numerical error.
2. Profile existing Python/Julia calculations before rewriting them.
3. Learn GPU concepts: threads, blocks, warps, memory hierarchy, synchronization, and data transfer.
4. Use optimized CUDA libraries before implementing custom kernels.
5. Learn Julia's type system, multiple dispatch, broadcasting, profiling, and allocation control.
6. Use CUDA.jl for naturally parallel scientific workloads.
7. Validate GPU results against trusted CPU calculations, including convergence and precision tests.

---

# References and further reading

1. [NVIDIA — CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/) — official programming model, GPU execution, memory, advanced CUDA features and performance concepts.
2. [NVIDIA — CUDA Toolkit Documentation](https://docs.nvidia.com/cuda/) — compiler, libraries, APIs, profiling tools and current toolkit documentation.
3. [NVIDIA — CUDA Platform](https://developer.nvidia.com/cuda) — CUDA ecosystem and accelerated-computing overview.
4. [Julia — Official Documentation](https://docs.julialang.org/) — language manual, performance guidance, parallel computing and standard-library documentation.
5. [Bezanson et al., “Julia: A Fresh Approach to Numerical Computing,” SIAM Review 59, 65–98 (2017)](https://doi.org/10.1137/141000671) — design and motivation of Julia for numerical computing.
6. [CUDA.jl Documentation](https://cuda.juliagpu.org/stable/) — Julia interface for NVIDIA GPU programming.
7. [JuliaGPU](https://juliagpu.org/) — GPU-computing ecosystem for Julia.
8. [NVIDIA cuBLAS](https://docs.nvidia.com/cuda/cublas/) — GPU dense linear algebra.
9. [NVIDIA cuFFT](https://docs.nvidia.com/cuda/cufft/) — GPU FFT library.
10. [NVIDIA cuSPARSE](https://docs.nvidia.com/cuda/cusparse/) — sparse linear algebra on NVIDIA GPUs.

---

[← Home](../)
