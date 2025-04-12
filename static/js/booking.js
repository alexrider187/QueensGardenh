/**
 * Queens Garden Hotel - Booking System JavaScript
 * This file contains functionality for the hotel booking system.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get booking form elements
    const bookingForm = document.getElementById('bookingForm');
    const submitButton = document.getElementById('submitBooking');
    const bookingModal = document.getElementById('bookingModal');
    
    // Set minimum dates for check-in and check-out
    const setMinDates = function() {
        const checkInInput = document.getElementById('checkIn');
        const checkOutInput = document.getElementById('checkOut');
        
        if (checkInInput && checkOutInput) {
            // Set min date to today for check-in
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            // Format dates as YYYY-MM-DD
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
            
            checkInInput.min = formatDate(today);
            checkOutInput.min = formatDate(tomorrow);
            
            // Update check-out min date when check-in changes
            checkInInput.addEventListener('change', function() {
                if (this.value) {
                    const newMinCheckout = new Date(this.value);
                    newMinCheckout.setDate(newMinCheckout.getDate() + 1);
                    checkOutInput.min = formatDate(newMinCheckout);
                    
                    // If current check-out date is before new min, update it
                    if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(this.value)) {
                        checkOutInput.value = formatDate(newMinCheckout);
                    }
                }
            });
        }
    };
    
    // Initialize date constraints
    setMinDates();
    
    // Validate the booking form before submission
    const validateBookingForm = function() {
        let isValid = true;
        const requiredFields = bookingForm.querySelectorAll('[required]');
        
        // Remove any existing error messages
        bookingForm.querySelectorAll('.is-invalid').forEach(field => {
            field.classList.remove('is-invalid');
        });
        
        // Check each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            }
        });
        
        // Check date logic
        const checkIn = document.getElementById('checkIn');
        const checkOut = document.getElementById('checkOut');
        
        if (checkIn && checkOut && checkIn.value && checkOut.value) {
            const checkInDate = new Date(checkIn.value);
            const checkOutDate = new Date(checkOut.value);
            
            if (checkOutDate <= checkInDate) {
                checkOut.classList.add('is-invalid');
                isValid = false;
            }
        }
        
        // Email validation
        const email = document.getElementById('email');
        if (email && email.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }
        }
        
        return isValid;
    };
    
    // Handle form submission
    if (submitButton && bookingForm) {
        submitButton.addEventListener('click', function() {
            if (validateBookingForm()) {
                // In a real application, we would submit the form to a server here
                // For this demo, we'll just show a success message
                
                // Get form values for display
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const checkIn = document.getElementById('checkIn').value;
                const checkOut = document.getElementById('checkOut').value;
                const roomType = document.getElementById('roomType').value;
                
                // Create confirmation message
                const formattedCheckIn = new Date(checkIn).toLocaleDateString();
                const formattedCheckOut = new Date(checkOut).toLocaleDateString();
                
                // Map room type value to display name
                const roomTypeMap = {
                    'standard': 'Standard Room',
                    'deluxe': 'Deluxe Room',
                    'suite': 'Garden Suite',
                    'presidential': 'Presidential Suite'
                };
                
                const displayRoomType = roomTypeMap[roomType] || roomType;
                
                // Replace form with success message
                const modalBody = document.querySelector('#bookingModal .modal-body');
                const modalFooter = document.querySelector('#bookingModal .modal-footer');
                const modalTitle = document.querySelector('#bookingModal .modal-title');
                
                modalTitle.textContent = 'Booking Request Submitted';
                
                // Create success message HTML
                modalBody.innerHTML = `
                    <div class="text-center mb-4">
                        <i class="fas fa-check-circle text-success fa-4x mb-3"></i>
                        <h4>Thank you, ${firstName}!</h4>
                        <p>Your booking request has been successfully submitted.</p>
                    </div>
                    <div class="booking-summary">
                        <h5 class="mb-3">Booking Summary</h5>
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                                <p><strong>Email:</strong> ${email}</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Check-in:</strong> ${formattedCheckIn}</p>
                                <p><strong>Check-out:</strong> ${formattedCheckOut}</p>
                                <p><strong>Room:</strong> ${displayRoomType}</p>
                            </div>
                        </div>
                    </div>
                    <div class="alert alert-info mt-4">
                        <i class="fas fa-info-circle me-2"></i>
                        <span>Our team will contact you shortly to confirm your reservation.</span>
                    </div>
                `;
                
                // Update footer buttons
                modalFooter.innerHTML = `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                `;
                
                // Set up event to reset the form when modal is hidden
                bookingModal.addEventListener('hidden.bs.modal', function() {
                    // Reset the form (but wait until modal is fully hidden)
                    setTimeout(() => {
                        bookingForm.reset();
                        
                        // Restore the original modal content
                        location.reload();
                    }, 300);
                }, { once: true });
            }
        });
    }
    
    // Set room type in booking form when "Book Now" is clicked on room cards
    const roomBookButtons = document.querySelectorAll('[data-room-type]');
    if (roomBookButtons.length > 0) {
        roomBookButtons.forEach(button => {
            button.addEventListener('click', function() {
                const roomType = this.getAttribute('data-room-type');
                const roomTypeSelect = document.getElementById('roomType');
                
                if (roomTypeSelect) {
                    // Find and select the option
                    for (let i = 0; i < roomTypeSelect.options.length; i++) {
                        if (roomTypeSelect.options[i].value === roomType) {
                            roomTypeSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
            });
        });
    }
    
    // Function to calculate and display price estimate
    const calculatePriceEstimate = function() {
        const checkIn = document.getElementById('checkIn');
        const checkOut = document.getElementById('checkOut');
        const roomType = document.getElementById('roomType');
        const guests = document.getElementById('guests');
        const priceEstimateElement = document.getElementById('priceEstimate');
        
        if (checkIn && checkOut && roomType && priceEstimateElement) {
            // Only calculate if all required fields have values
            if (checkIn.value && checkOut.value && roomType.value) {
                // Calculate number of nights
                const checkInDate = new Date(checkIn.value);
                const checkOutDate = new Date(checkOut.value);
                const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
                
                if (nights > 0) {
                    // Base room rates
                    const roomRates = {
                        'standard': 199,
                        'deluxe': 299,
                        'suite': 399,
                        'presidential': 799
                    };
                    
                    // Get base rate for selected room
                    const baseRate = roomRates[roomType.value] || 0;
                    
                    // Calculate total
                    let total = baseRate * nights;
                    
                    // Add guest supplement if more than 2 guests for standard and deluxe
                    if (guests && guests.value > 2 && (roomType.value === 'standard' || roomType.value === 'deluxe')) {
                        const extraGuests = guests.value - 2;
                        total += (50 * extraGuests * nights); // $50 per extra guest per night
                    }
                    
                    // Update the price estimate display
                    priceEstimateElement.innerHTML = `
                        <div class="alert alert-info mt-3">
                            <h6 class="mb-2">Price Estimate</h6>
                            <p class="mb-1">${nights} night${nights !== 1 ? 's' : ''} at $${baseRate}/night</p>
                            ${guests && guests.value > 2 && (roomType.value === 'standard' || roomType.value === 'deluxe') ? 
                                `<p class="mb-1">Extra guest fee: $${50 * (guests.value - 2) * nights}</p>` : ''}
                            <p class="mb-0 fw-bold">Total: $${total}</p>
                        </div>
                    `;
                    
                    // Show the element
                    priceEstimateElement.style.display = 'block';
                }
            }
        }
    };
    
    // Set up price estimate calculation
    const priceEstimateElement = document.createElement('div');
    priceEstimateElement.id = 'priceEstimate';
    
    if (bookingForm) {
        // Add the price estimate element to the form
        bookingForm.appendChild(priceEstimateElement);
        
        // Set up event listeners for price calculation
        const checkIn = document.getElementById('checkIn');
        const checkOut = document.getElementById('checkOut');
        const roomType = document.getElementById('roomType');
        const guests = document.getElementById('guests');
        
        if (checkIn && checkOut && roomType) {
            [checkIn, checkOut, roomType, guests].forEach(element => {
                if (element) {
                    element.addEventListener('change', calculatePriceEstimate);
                }
            });
        }
    }
});
