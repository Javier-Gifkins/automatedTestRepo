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
});