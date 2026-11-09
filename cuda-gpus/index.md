---
layout: default
title: NVIDIA CUDA & GPU Hardware — Architecture, Programming and 2026 GPU Specifications
description: Concise CUDA introduction with RTX 50, RTX PRO Blackwell, NVIDIA B200/B300 and Rubin GPUs; memory, CUDA cores, power, compute capability, and official specification links.
---

# NVIDIA CUDA & GPU Hardware

**Specifications checked: 9 November 2026.** This is a *technical reference*, not a price or stock tracker. Product names, software support, and power limits may change; check the linked NVIDIA product pages for revisions.

<div class="intuition"><span class="callout-title">Physical intuition</span><strong>CUDA</strong> is NVIDIA's parallel-computing platform and programming model. A CPU manages the program and launches work on the GPU; a GPU executes many data-parallel threads using streaming multiprocessors (SMs). CUDA is especially useful for repeated, independent numerical operations on large arrays. The available speedup depends on memory transfers, memory bandwidth, parallelism, precision and algorithm design.</div>

## 1. What is CUDA?

CUDA includes a programming model, compiler (nvcc), runtime and driver interfaces, libraries and profiling/debugging tools. A CPU is the **host** and a compatible NVIDIA GPU is the **device**.

<div class="pathway"><span class="node">CPU program</span><span class="arrow">→</span><span class="node">device memory + kernel launch</span><span class="arrow">→</span><span class="node">GPU SMs / thread blocks</span><span class="arrow">→</span><span class="node">results / analysis</span></div>

| Concept | Meaning |
|---|---|
| **Kernel** | Function executed on the GPU by many threads |
| **Grid / block / thread** | Hierarchical indexing of parallel work |
| **Warp** | Group of 32 threads scheduled together in the SIMT execution model on current NVIDIA architectures |
| **Registers / shared memory** | Fast per-thread / per-block storage; capacity constrains occupancy |
| **Global memory** | Device memory used for large arrays and data exchange |
| **CUDA cores** | General arithmetic execution units; not comparable one-to-one across architectures |
| **Tensor Cores** | Specialized matrix/mixed-precision acceleration; peak AI TOPS is *not* FP64 scientific throughput |
| **Compute capability (CC)** | Architecture feature level used for compatibility and compilation targets |

**CUDA 13.5** is the latest toolkit release verified here (announced 4 November 2026), and includes production support for NVIDIA Vera Rubin. Install the driver and toolkit appropriate to your operating system and GPU: [CUDA Toolkit](https://developer.nvidia.com/cuda/toolkit), [CUDA 13.5 release notes](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/), and [CUDA GPU compute capability list](https://developer.nvidia.com/cuda/gpus).

## 2. GeForce RTX 50 series — consumer desktop GPUs

NVIDIA's currently listed GeForce desktop generation is **Blackwell RTX 50**. Values below are reference/Founders Edition specifications where applicable; board-partner cooling, clocks and power may vary. All seven models shown have **compute capability 12.0**.

| GPU | CUDA cores | Video memory | Memory bandwidth | Total graphics power | Official details |
|---|---:|---|---:|---:|---|
| GeForce **RTX 5090** | 21,760 | 32 GB GDDR7 | 1,792 GB/s | 575 W | [RTX 5090](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/) |
| GeForce **RTX 5080** | 10,752 | 16 GB GDDR7 | 960 GB/s | 360 W | [RTX 5080](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/) |
| GeForce **RTX 5070 Ti** | 8,960 | 16 GB GDDR7 | 896 GB/s | 300 W | [RTX 5070 family](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/) |
| GeForce **RTX 5070** | 6,144 | 12 GB GDDR7 | 672 GB/s | 250 W | [RTX 5070 family](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/) |
| GeForce **RTX 5060 Ti** | 4,608 | 16 or 8 GB GDDR7 | 448 GB/s | 180 W | [RTX 5060 family](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5060-family/) |
| GeForce **RTX 5060** | 3,840 | 8 GB GDDR7 | 448 GB/s | 145 W | [RTX 5060 family](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5060-family/) |
| GeForce **RTX 5050** | 2,560 | 8 GB GDDR6 | 320 GB/s | 130 W | [RTX 50 series](https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/) |

**Primary cross-check:** [NVIDIA GeForce comparison and detailed specifications](https://www.nvidia.com/en-us/geforce/graphics-cards/compare/). A 16 GB GPU is not necessarily faster than an 8 GB GPU; capacity establishes whether a problem fits, while actual execution speed is influenced by bandwidth, compute units, clock, precision and software.

## 3. RTX PRO Blackwell — workstation GPUs

Professional workstation models focus on larger ECC-equipped memory options, professional software support and engineering/visualization workflows. These **are workstation graphics cards**, not HGX data-center accelerator modules. The listed RTX PRO Blackwell desktop family uses **compute capability 12.0**.

| Workstation GPU | GPU memory | Memory bandwidth | Maximum board power | Official NVIDIA source |
|---|---|---:|---:|---|
| **RTX PRO 6000 Blackwell Workstation** | 96 GB GDDR7 ECC | 1,792 GB/s | 600 W | [RTX PRO 6000](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000/) |
| **RTX PRO 6000 Blackwell Max-Q Workstation** | 96 GB GDDR7 ECC | See datasheet | 300 W | [RTX PRO 6000 Max-Q](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000-max-q/) |
| **RTX PRO 5500 Blackwell Workstation** | 84 GB GDDR7 ECC | 1,398 GB/s | Up to 600 W | [RTX PRO 5500](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-5500/) |
| **RTX PRO 5000 Blackwell** | 48 or 72 GB GDDR7 ECC | 1,344 GB/s | 300 W | [RTX PRO 5000](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-5000/) |
| **RTX PRO 4500 Blackwell Workstation** | 32 GB GDDR7 ECC | 896 GB/s | 200 W | [RTX PRO 4500](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-4500/) |
| **RTX PRO 4000 Blackwell** | 24 GB GDDR7 ECC | 672 GB/s | 145 W | [RTX PRO 4000](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-4000/) |
| **RTX PRO 4000 Blackwell SFF** | 24 GB GDDR7 ECC | See datasheet | 70 W | [RTX PRO workstation comparison](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/) |
| **RTX PRO 2000 Blackwell** | 16 GB GDDR7 ECC | 288 GB/s | 70 W | [RTX PRO 2000 family](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/) |

These workstation cards differ in **form factor, ECC memory, ISV-certified software ecosystem, cooling, price and available performance**. The current RTX PRO 5500 is particularly notable for its 84 GB ECC configuration. Product availability depends on OEMs and markets.

## 4. Data-center compute accelerators — Blackwell and Rubin

These are server/HGX/SXM-class accelerator devices, **not ordinary PCIe desktop graphics cards**. Their cooling, host CPUs, NVLink/NVSwitch, power delivery and deployment models differ. Memory figures below are **per GPU**, not for an entire eight-GPU HGX system.

| GPU / accelerator | Architecture / CC | HBM memory per GPU | Memory bandwidth per GPU | Official reference |
|---|---|---:|---:|---|
| **NVIDIA Rubin GPU** | Rubin (check compiler support) | 288 GB HBM4 | 22 TB/s | [NVIDIA HGX Rubin specifications](https://www.nvidia.com/en-us/data-center/hgx/) |
| **NVIDIA B300 SXM** | Blackwell Ultra / 10.3 | 288 GB HBM3e | Up to 8 TB/s | [NVIDIA HGX B300 reference architecture](https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory/latest/components.html) |
| **NVIDIA B200 SXM** | Blackwell / 10.0 | 180 GB HBM3e | Up to 8 TB/s | [NVIDIA HGX B200](https://www.nvidia.com/en-us/data-center/hgx/) |
| **NVIDIA H200 SXM** | Hopper / 9.0 | 141 GB HBM3e | 4.8 TB/s | [NVIDIA H200 / HGX reference architecture](https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory/latest/components.html) |

NVIDIA's Rubin specifications describe the **NVL72** rack-scale platform as 72 GPUs with NVLink interconnect, not a 72-GB graphics card. Its quoted FP4 inference PFLOPS are not directly comparable to FP32/FP64 arithmetic rates for Maxwell/FEM solvers. [NVIDIA Rubin platform](https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/).

## 5. Picking a GPU for scientific electromagnetics

The most important specifications depend on the physical solver:

| Workload | GPU selection criterion | Common bottleneck |
|---|---|---|
| 3-D FDTD / finite-difference PDEs | Memory bandwidth, capacity, stencil efficiency | Streaming memory access and halo transfers |
| FEM / MoM sparse linear algebra | Memory capacity, sparse libraries, multi-GPU communication | Irregular sparse data access / solver conditioning |
| Dense eigensolvers for quantum states | cuSOLVER/cuBLAS precision and workspace | Dense matrix operations and available memory |
| RF SDR FFT and spectral analysis | cuFFT speed, streaming pipeline, transfer latency | Host–GPU transfer and small-batch launch overhead |
| Monte Carlo particles | Millions of independent trajectories and suitable RNG | Divergence, random memory access, host transfers |
| AI surrogates / inverse models | Tensor Cores and supported reduced precision | Data movement and training memory |

**Precision warning:** scientific simulations may require FP64 rather than FP32 or mixed-precision Tensor Core operations. GeForce and some workstation GPUs prioritize graphics and AI workloads; do not assume their FP64 throughput matches dedicated HPC accelerators. Always verify the accuracy and numerical conditioning of your algorithm.

For a rough roofline performance bound,

$$P_\mathrm{attainable}\ \leq\ \min\!\left(P_\mathrm{peak},\ \mathcal I\,B_\mathrm{mem}\right),$$

where $P_\mathrm{peak}$ is arithmetic peak throughput, $\mathcal I$ is arithmetic intensity (floating-point operations per byte transferred), and $B_\mathrm{mem}$ is sustained memory bandwidth under a compatible definition. Peak marketing bandwidth is not a benchmark.

**Memory example:** a full 3-D Yee FDTD mesh with six float32 field components at $500^3$ cells requires approximately $6\times500^3\times4 = 3.0$ GB just for electric and magnetic field components. Material coefficients, PML, buffers and multi-GPU halos can make the true requirement substantially larger.

## 6. Minimal CUDA C++ example

This program adds two vectors in parallel. Save as `vector_add.cu` and compile on a machine with an appropriate NVIDIA driver and CUDA Toolkit:

```cpp
#include <cuda_runtime.h>
#include <cstdio>
#include <vector>

__global__ void add_vectors(const float* a, const float* b,
                            float* c, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) c[i] = a[i] + b[i];
}

int main() {
    const int n = 1 << 20;
    const size_t bytes = n * sizeof(float);
    std::vector<float> a(n, 1.0f), b(n, 2.0f), c(n);

    float *da = nullptr, *db = nullptr, *dc = nullptr;
    cudaMalloc(&da, bytes);
    cudaMalloc(&db, bytes);
    cudaMalloc(&dc, bytes);
    cudaMemcpy(da, a.data(), bytes, cudaMemcpyHostToDevice);
    cudaMemcpy(db, b.data(), bytes, cudaMemcpyHostToDevice);

    add_vectors<<<(n + 255) / 256, 256>>>(da, db, dc, n);
    cudaError_t err = cudaGetLastError();
    if (err == cudaSuccess) err = cudaDeviceSynchronize();
    if (err != cudaSuccess) {
        std::fprintf(stderr, "CUDA error: %s\n", cudaGetErrorString(err));
        return 1;
    }

    cudaMemcpy(c.data(), dc, bytes, cudaMemcpyDeviceToHost);
    std::printf("c[0]=%.1f, c[last]=%.1f\n", c[0], c[n-1]);
    cudaFree(da); cudaFree(db); cudaFree(dc);
    return 0;
}
```

```bash
nvcc -O2 vector_add.cu -o vector_add
./vector_add       # Windows: vector_add.exe
nvidia-smi         # Check installed hardware/driver information
```

*Production code should check every allocation and transfer API return value, test numerical correctness against a CPU implementation, and benchmark only after warm-up and synchronization.*

For Python, use GPU-backed libraries such as [CuPy](https://docs.cupy.dev/en/stable/) for array workflows; [Numba CUDA](https://nvidia.github.io/numba-cuda/) or the CUDA Python ecosystem for suitable custom kernels. Choose the supported toolchain for the installed driver and compute capability.

## 7. Official documentation and learning links

- [CUDA 13.5 Toolkit](https://developer.nvidia.com/cuda/toolkit) — installers, compiler and runtime.
- [CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-programming-guide/) — grids, thread blocks, memory, synchronization and performance.
- [CUDA C++ Best Practices](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/) — profiling, occupancy, memory coalescing and roofline-like performance reasoning.
- [CUDA GPU compute capability](https://developer.nvidia.com/cuda/gpus) — current NVIDIA GPUs and architecture support.
- [CUDA samples](https://github.com/NVIDIA/cuda-samples), [Nsight Compute](https://developer.nvidia.com/nsight-compute), [Nsight Systems](https://developer.nvidia.com/nsight-systems).
- [GeForce RTX 50 full specification comparison](https://www.nvidia.com/en-us/geforce/graphics-cards/compare/).
- [RTX PRO desktop lineup](https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/).
- [NVIDIA HGX systems](https://www.nvidia.com/en-us/data-center/hgx/).

## 8. Related pages in this reference

[Computational Methods](../computational-methods/) · [Simulation Library](../simulations/) · [Data Converters](../data-converters/) · [SDR](../sdr/) · [Computational Electromagnetics](../computational-em/) · [Inverse EM Problems](../inverse-em-problems/) · [Advanced Engineering Learning Map](../advanced-engineering/).
