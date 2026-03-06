# IoT & Embedded Systems Kickoff Checklist

Extends `universal-checklist.md`. Asked after domain detection identifies an IoT or embedded systems project.

---

## Device Hardware

1. **Target hardware platform?** (Custom PCB | Development board: ESP32, Raspberry Pi, Arduino | Off-the-shelf module)
2. **MCU / processor?** (STM32 | ESP32 | nRF52 | i.MX | Raspberry Pi CM | Other)
3. **Power source?** (Battery-powered | Mains / always-on | Energy harvesting — power budget requirements differ significantly)
4. **Operating environment?** (Consumer indoor | Industrial | Outdoor | Extreme temperature / humidity)

---

## Connectivity

5. **Communication protocol?** (WiFi | BLE | Cellular (LTE-M / NB-IoT) | LoRaWAN | Zigbee | Thread | Ethernet)
6. **Device-to-cloud messaging protocol?** (MQTT | CoAP | HTTP — justify HTTP if chosen for a constrained device)
7. **Network reliability assumption?** (Disconnection expected frequently — offline buffer strategy defined?)

---

## Firmware & Software

8. **RTOS or bare metal?** (FreeRTOS | Zephyr | Mbed | Bare metal — justified by real-time requirements or resource constraints?)
9. **OTA update mechanism?** (A/B partition with rollback | Single-partition with recovery | None yet — if none, this is a critical gap)
10. **Secure boot?** (Signed firmware verification — required for any publicly-deployed device)

---

## Cloud Platform

11. **IoT cloud platform?** (AWS IoT Core | Azure IoT Hub | Google Cloud IoT | Balena | Custom MQTT broker)
12. **Device shadow / digital twin pattern?** (Confirmed — devices need a cloud state representation independent of connectivity)
13. **Fleet management?** (Provisioning, configuration updates, remote monitoring, command execution — what's the tooling?)

---

## Security

14. **Device authentication model?** (Unique certificate per device | Shared secret | Token-based)
15. **Certificate rotation strategy?** (How are certificates renewed before expiry on deployed devices?)
16. **JTAG/SWD disabled in production builds?** (Debug interfaces are a physical attack surface)

---

## Data & Analytics

17. **Telemetry data model?** (Time-series — which database: InfluxDB | TimescaleDB | Amazon Timestream | Other)
18. **Data volume estimate?** (Events per second per device × device count — sets infrastructure scale requirements)
19. **Edge processing vs. cloud processing?** (Which computation happens on the device vs. in the cloud — and why?)

---

## Conditional

### If battery-powered
20. **Power budget modeled?** (Target battery life | Idle current | Active current | Sleep mode strategy)
21. **Battery monitoring?** (How does the cloud know a device's battery level before it dies in the field?)

### If regulated product
22. **Wireless certification required?** (FCC for US | CE for EU | Country-specific — timeline budgeted?)
23. **Safety certifications required?** (Medical FDA | Industrial IEC 61508 | Automotive ISO 26262 | None)
