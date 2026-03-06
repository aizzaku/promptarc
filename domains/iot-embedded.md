# Domain: IoT & Embedded Systems

## Context Primer

IoT systems span the full stack from firmware on constrained microcontrollers to cloud platforms managing millions of devices — and every layer has failure modes that don't exist in pure software systems. Physical devices have production lifecycles measured in years or decades. Firmware update mechanisms must work correctly on day one, because broken OTA (over-the-air) update systems create devices that can never be patched. In the field, a device that loses power mid-update must recover to a known-good state — not brick.

Connectivity is unreliable in IoT contexts. Devices may be behind NAT, on cellular with intermittent coverage, or in RF-hostile industrial environments. The network model must assume disconnection as the normal operating condition, not an error. Protocols like MQTT and CoAP are designed for constrained, unreliable networks; HTTP is often inappropriate for devices that wake briefly, send data, and sleep.

Security for embedded systems requires a different threat model than web security. Physical access to a device enables firmware extraction, JTAG debugging, and side-channel attacks. Supply chain security matters — components and firmware from untrusted suppliers have been used in large-scale botnet attacks (Mirai). Secure boot, signed firmware, and hardware security modules (HSMs) are the mechanisms that address physical attack surfaces.

## Common Patterns

- **Device shadow / digital twin**: A cloud representation of the device's current and desired state. The device syncs to the cloud when connected; the platform can queue commands for disconnected devices.
- **Secure OTA updates**: Firmware updates delivered over the network with cryptographic signing, A/B partitions, and rollback capability. A device that can't update safely can't be patched.
- **MQTT broker**: Publish/subscribe protocol designed for constrained devices and unreliable networks. Devices publish telemetry to topics; cloud services subscribe and process.
- **Edge computing**: Processing data on the device or a local gateway rather than sending everything to the cloud. Reduces latency, bandwidth, and cloud processing cost.
- **Fleet management**: Device provisioning, configuration management, remote monitoring, and remote command execution at scale.
- **Time-series telemetry storage**: Sensor data arrives at high volume with time as the primary query dimension. Specialized time-series databases (InfluxDB, TimescaleDB) handle this efficiently.
- **Secure boot chain**: Each firmware component verifies the signature of the next before execution. Prevents unauthorized firmware from running.

## Domain Vocabulary

- **MCU (Microcontroller Unit)**: A compact integrated circuit containing a processor, memory, and I/O peripherals. The compute unit in most embedded devices. Examples: STM32, ESP32, nRF52.
- **RTOS (Real-Time Operating System)**: An operating system providing deterministic, time-bounded task scheduling. Required for hard real-time applications. Examples: FreeRTOS, Zephyr.
- **OTA (Over-The-Air) update**: Firmware update delivered over a network connection without physical access to the device.
- **MQTT**: A lightweight publish/subscribe protocol designed for low-bandwidth, high-latency, or unreliable networks. The dominant IoT messaging protocol.
- **Device shadow / Digital twin**: The cloud representation of a device's state, including the last-known actual state and the desired future state.
- **Secure boot**: A mechanism that verifies the cryptographic signature of firmware before allowing it to execute. Prevents running unauthorized or tampered firmware.
- **Edge computing**: Processing that occurs on or near the device rather than in a central cloud. Reduces latency and bandwidth consumption.
- **Provisioning**: The process of authenticating a new device to the platform and establishing its identity and initial configuration.
- **JTAG / SWD**: Debug interfaces that provide direct access to device internals. Physical access to JTAG enables firmware extraction and debugging — a physical security concern.
- **Power budget**: The energy available to a battery-powered device over its target operational lifetime. Every component's power draw must fit within this budget.

## Regulatory/Compliance

- **ETSI EN 303 645 / NISTIR 8259**: IoT security baseline standards. ETSI 303 645 is mandatory for consumer IoT products sold in the EU as of 2024.
- **FCC / CE marking**: Radio certification required for any device with wireless communication (WiFi, BLE, Cellular, Zigbee) sold in the US (FCC) or EU (CE).
- **Safety certifications**: Medical devices (FDA), industrial equipment (IEC 61508 functional safety), automotive (ISO 26262) have specific safety certification requirements.
- **GDPR / CCPA**: IoT devices often collect sensitive data (location, behavior, health). Data minimization, user consent, and deletion rights apply.
- **Supply chain security**: Hardware components from untrusted sources have been used in large-scale attacks. SBOM (Software Bill of Materials) requirements are growing.

## Common Pitfalls

- OTA update mechanism that can brick devices on failed update — must have A/B partitions and rollback
- No secure boot — allows unauthorized firmware to run
- Assuming reliable network connectivity — IoT devices must tolerate disconnection as the normal state
- MQTT at high device scale without backpressure — unconstrained telemetry volume overwhelms cloud processing
- Production firmware without remote debugging capability — physical access to field-deployed devices is expensive
- Power budget not modeled during design — battery life failures discovered in field
- No device certificate rotation strategy — certificates expire, devices in the field must be re-provisioned

## Quality Signals

- Treats OTA update safety as a hard requirement from day one
- Designs the network model assuming disconnection is normal, not exceptional
- Proposes secure boot and signed firmware for any device in a public or untrusted environment
- Models power budget for battery-powered devices during design, not testing
- Distinguishes between edge processing and cloud processing and knows when each is appropriate

## Anti-Patterns

- Building IoT firmware like a web application (blocking I/O, dynamic memory allocation, no watchdog timer)
- Treating OTA updates as a nice-to-have — devices that can't be updated safely can't be patched for security vulnerabilities
- Ignoring FCC/CE certification until the device is ready to ship — certification takes months

## Recommended Stack/Tools

- **Cloud IoT platforms**: AWS IoT Core (MQTT, device shadow, fleet management), Azure IoT Hub, Google Cloud IoT, Balena (container-based)
- **MQTT brokers**: Mosquitto (self-hosted), EMQX (high-scale, enterprise), HiveMQ
- **Time-series databases**: InfluxDB, TimescaleDB (PostgreSQL extension), Amazon Timestream
- **RTOS**: FreeRTOS (most common, widely supported), Zephyr (Linux Foundation, modern), Mbed OS
- **Edge compute**: AWS Greengrass, Azure IoT Edge, EdgeX Foundry (open source)
- **OTA update frameworks**: Mender (open source, professional support), Balena, AWS IoT Jobs
- **Device security**: AWS IoT Device Defender, custom PKI with HSM for certificate management
