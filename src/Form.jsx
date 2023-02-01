const Form = props => {
	return (
		<form>
			<div>
				<p>
					name: <input value={props.newName} onChange={props.handleNameInput} />
				</p>
				<p>
					number: <input value={props.newNumber} onChange={props.handleNumberInput} />
				</p>
			</div>
			<div>
				<button onClick={props.addPerson} type='submit'>
					add
				</button>
			</div>
		</form>
	);
};

export default Form;
