import PropTypes from "prop-types";

FormRow.propTypes = {
	alignItems: PropTypes.string,
	justifyContent: PropTypes.string,
	children: PropTypes.node,
};

function FormRow({ alignItems = "items-start", justifyContent = "justify-start", children }) {
	return <div className={`w-full flex gap-4  ${alignItems} ${justifyContent}`}>{children}</div>;
}

export default FormRow;
