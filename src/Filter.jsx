const Filter = ({filter, handleFilterInput}) => {
	return (
		<div>
			filter names with <input value={filter} onChange={handleFilterInput} />
		</div>
	);
};

export default Filter;
