import React from 'react'
import PropTypes from 'prop-types'


class ItemBarContent extends React.Component{
  static propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    content: PropTypes.string
  }

  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.state = {
      nodeColor: 'white'
    }
  }

  onClick(){
    this.props.onClick()
  }

  onTouchStart(e){
    e.preventDefault()
    this.setState({
      nodeColor: 'darkgray'
    })
  }

  onTouchEnd(e){
    e.preventDefault()
    this.setState({
      nodeColor: 'white'
    })
  }

  onTouchMove(e){
    e.preventDefault()
  }

  componentDidMount(){
    this.node.addEventListener('touchstart', this.onTouchStart)
    this.node.addEventListener('touchend', this.onTouchEnd)
    this.node.addEventListener('click', this.onClick)
    this.node.addEventListener('touchmove', this.onTouchMove)
  }

  componentWillUnmount(){
    this.node.removeEventListener('touchstart', this.onTouchStart)
    this.node.removeEventListener('touchend', this.onTouchEnd)
    this.node.removeEventListener('click', this.onClick)
    this.node.removeEventListener('touchmove', this.onTouchMove)
  }

  render(){
    return <div
      style = {{
        boxSizing: 'border-box',
        width: '100%',
        height: '2.5rem',
        borderBottom: '0px',
        borderLeft: '0px',
        borderRight: '0px',
        borderTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        marginTop: '0px',
        marginBottom: '0px',
        textAlign: 'center',
        backgroundColor: this.state.nodeColor,
      }}
      ref = {node => this.node = node}
    >
      <table
        style = {{
          boxSizing: 'border-box',
          border: '0px',
          width: '100%',
          height: '100%',
          paddingLeft: '8px',
          paddingRight: '8px'
        }}
      >
        <tbody>
        <tr
          style = {{
            border: '0px',
            textAlign: 'left'
          }}
        >
          <td> 
            {this.props.label} 
          </td>
          <td
            style = {{
              border: '0px',
              textAlign: 'right'
            }}
          > 
            {this.props.content} 
          </td>
        </tr>
        </tbody>
      </table>
      <hr/>
    </div>
  }
}

export default ItemBarContent
