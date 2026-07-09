# Bothmas Shuttle - Trip Tracker Plan

This document outlines the core planning and data structure for the Bothmas Shuttle trip tracking system.

## 1. Core Objectives
* Track daily shuttle trips in real-time.
* Manage driver and vehicle assignments.
* Keep logs of passenger counts and route statuses.

## 2. Planned Features
* **Driver Dashboard:** Where drivers can see their scheduled trips and mark them as "En Route" or "Completed".
* **Admin Overview:** A master view to see all moving shuttles, open seats, and daily revenue.
* **Client Notifications:** Potential integration to send booking details or arrival updates.

## 3. Data Structure (Trip Log Columns)
* **Trip ID:** Unique reference number (e.g., #001)
* **Driver:** Name of the assigned driver
* **Vehicle Reg:** Registration / License plate of the van
* **Route:** Pickup point to Drop-off point
* **Departure Time:** Date and exact time of leave
* **Seats Booked:** Number of passengers on board
* **Status:** [Scheduled / En Route / Completed / Delayed]
