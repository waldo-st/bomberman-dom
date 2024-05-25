import { VElement } from "../framework/VElement.js";

export class timerWait{
    constructor() {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
        this.currentDuration = 20000; // Initial duration of 20 seconds

        // this.timerDisplay = new VElement('div', { class: 'timer-display', id: 'timerDisplay' }, '00:20');
        this.timerContainer = new VElement('div', {class:'contain', id: 'room'}, [
            new VElement('div', { class: 'timer-container' }, [
                new VElement('div', { class: 'timer-display', id: 'timerDisplay' }, '00:20'),
            ])
        ]);
    }

    render() {
        return this.timerContainer.render();
    }

    roomWait(avatar, username){
        const room = document.getElementById('room')
        const newPlayer =  new VElement('div', { class: 'message' }, [
            new VElement('span', {},`${avatar}`),
            new VElement('span', {}, `${username} join the game`)
        ]).render();
        room.appendChild(newPlayer)
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.updateTimer();
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            cancelAnimationFrame(this.timerInterval);
        }
    }

    reset() {
        this.isRunning = false;
        cancelAnimationFrame(this.timerInterval);
        this.currentDuration = 20000; // Reset to initial duration of 20 seconds
        this.elapsedTime = 0;
        this.updateDisplay(this.currentDuration);
    }

    updateTimer() {
        this.elapsedTime = Date.now() - this.startTime;
        let remainingTime = this.currentDuration - this.elapsedTime;

        if (remainingTime <= 0) {
            if (this.currentDuration === 20000) {
                this.currentDuration = 10000; // Switch to 10 seconds duration
            } else {
                this.currentDuration = 20000; // Switch back to 20 seconds duration
            }
            this.elapsedTime = 0;
            this.startTime = Date.now();
            remainingTime = this.currentDuration;
        }

        this.updateDisplay(remainingTime);

        if (this.isRunning) {
            this.timerInterval = requestAnimationFrame(() => this.updateTimer());
        }
    }

    updateDisplay(time) {
        const totalSeconds = Math.ceil(time / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        document.getElementById('timerDisplay').textContent = formattedTime;
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const timer = new Timer();
//     document.body.appendChild(timer.render());
// });
