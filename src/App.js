import { useState } from 'react';

function App() {

	const [calc, setCalc] = useState("");
	const [result, setResult] = useState("");
	const ops = ['/', '*', '+', '-', '.'];

	const updateCalc = value => {
		if(
			(ops.includes(value) && calc === '') ||
			(ops.includes(value) && ops.includes(calc.slice(-1)))
		) {
			return;
		}
		if (!ops.includes(value)) {
			if(calc === '0') { return; }
			const func = new Function(`return ${calc}${value}`);
			setResult(func.call().toString());
		}
		setCalc(calc + value);
	}

	const digitsCreation = () => {
		const digits = [];

		for (let i = 1; i < 10; i++) {
			digits.push(
				<button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
			)
		}
		return digits;
	}

	const calculate = () => {
		if (ops.includes(calc.slice(-1))) {
			return;
		}
		const func = new Function(`return ${calc}`);
		setCalc(func.call().toString());
	}
	

	const deleteLast = () => {
		if (calc === '')  {
			return;
		}
		const value = calc.slice(0, -1);
		setCalc(value);
		setResult(value);
	}


	return (
		<div className="App">
			<div className="calculator">
				<div className="display">
					{result ? <span>({result}) </span>  : '' }
					{calc || "0"}
				</div>

				<div className="operators">
					<button onClick={() => updateCalc('/')}>÷</button>
					<button onClick={() => updateCalc('*')}>x</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>
					<button onClick={deleteLast}>DEL</button>
				</div>

				<div className="digits">
					{ digitsCreation () }
					<button onClick={() => updateCalc('0')}>0</button>
					<button onClick={() => updateCalc('.')}>.</button>
					<button onClick={calculate}>=</button>
				</div>

			</div>
		</div>
	);
}

export default App;
