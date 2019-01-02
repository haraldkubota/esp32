const circularBuffer = require('./circularBuffer.js')


function sparkLine(size) {
	let slBuffer = circularBuffer(size);
	let slMinBottomToTop = 1;

		function findMax() {
			let data = slBuffer.readAll(), i, maximum;
			maximum = data[0];
			for (i = 1; i < data.length; ++i)
				if (data[i] > maximum) maximum = data[i];
			return maximum;
		}

		function findMin() {
			let data = slBuffer.readAll(), i, minimum;
			minimum = data[0];
			for (i = 1; i < data.length; ++i)
				if (data[i] < minimum) minimum = data[i];
			return minimum;
		}

	return {
		min: function() {
			return findMin();
		},
		max: function() {
			return findMax();
		},

		// Add a new data element
		push: function(n) {
			slBuffer.push(n);
		},
		// Set minimum bottom-to-top value
		// e.g. 1 degree for temperature, or 5% for humidity
		// otherwise noise will dominate the picture of the measured data does not change
		minBottomToTop: function(n) { slMinBottomToTop = n },
		// return array ready to be graphed, need total y size
		graph: function (ySize) {
			let min = findMin(), max=findMax();
			let mid = (max + min) / 2;
			let scale;
			let dataIn = slBuffer.readAll();
			let dataOut = [];
			if (max - min < slMinBottomToTop) {
				max = mid + slMinBottomToTop / 2;
				min = mid - slMinBottomToTop / 2;
			}
			try {
				scale = ySize / (max - min);
			} catch(e) {
				scale = 1.23;
			}
			for (let i = 0; i < dataIn.length; ++i) {
				dataOut.push(Math.round((dataIn[i] - mid) * scale + ySize / 2));
			}
			return dataOut;
		}
	}
}

// nodejs
module.exports = sparkLine
// espruino
exports.sparkLine = sparkLine
