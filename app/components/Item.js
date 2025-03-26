

const Item = ({title, unit, val}) => {
    return(
        <div className="item">
            <div className="item-title">{title}</div>
            <div className="item-val">{val}<span>{unit}</span></div>
        </div>
    )
}

export default Item