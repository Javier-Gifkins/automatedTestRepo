const busCapacity = 40;
let availableSeats = busCapacity;

const bookingForm = document.getElementById("bookingForm");
const seatInput = document.getElementById("seats");
const message = document.getElementById("message");
const availableSeatsMessage = document.getElementById("availableSeats");

availableSeatsMessage.innerText = `Available seats: ${availableSeats}.`;

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const destination = document.getElementById("destination").value;
    const seats = Number(seatInput.value);
    const pricePerSeat = 10;

    if (!name || !destination || !Number.isInteger(seats) || seats <= 0) {
        message.innerText = "Please fill in all fields correctly.";
        return;
    }

    if (seats > availableSeats) {
        message.innerText = availableSeats === 0
            ? "No seats are available."
            : `Only ${availableSeats} seats are available.`;
        return;
    }

    const totalFare = seats * pricePerSeat;
    availableSeats -= seats;
    availableSeatsMessage.innerText = `Available seats: ${availableSeats}.`;
    message.innerText =
        `Booking confirmed for ${name} to ${destination}. Seats: ${seats}. Total fare: $${totalFare}.`;
});
