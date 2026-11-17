/** @jest-environment jsdom */

describe("bus ticket booking", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="bookingForm">
                <input id="name" value="Alex">
                <input id="destination" value="Wellington">
                <input id="seats" value="1">
            </form>
            <p id="message"></p>
            <p id="availableSeats"></p>
        `;

        jest.isolateModules(() => {
            require("../src/script.js");
        });
    });

    test("confirms a booking for the specified destination", () => {
        const form = document.getElementById("bookingForm");
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        expect(document.getElementById("message").innerText).toContain(
            "Booking confirmed for Alex to Wellington."
        );
    });

    test("calculates the total fare from the number of seats booked", () => {
        document.getElementById("seats").value = "3";

        const form = document.getElementById("bookingForm");
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        expect(document.getElementById("message").innerText).toBe(
            "Booking confirmed for Alex to Wellington. Seats: 3. Total fare: $30."
        );
    });

    test("reduces the available seat count after a successful booking", () => {
        document.getElementById("seats").value = "3";

        const form = document.getElementById("bookingForm");
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        expect(document.getElementById("availableSeats").innerText).toBe(
            "Available seats: 37."
        );
    });

    test("rejects a booking for more seats than are available", () => {
        document.getElementById("seats").value = "41";

        const form = document.getElementById("bookingForm");
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        expect(document.getElementById("message").innerText).toBe(
            "Only 40 seats are available."
        );
        expect(document.getElementById("availableSeats").innerText).toBe(
            "Available seats: 40."
        );
    });
});