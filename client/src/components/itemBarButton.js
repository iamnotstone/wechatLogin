import React from 'react'
import PropTypes from 'prop-types'


class ItemBarButton extends React.Component{
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string
  }

  constructor(props){
    super(props)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.state = {
      nodeColor: 'white'
    }
  }


  onTouchStart(e){
    e.preventDefault()
    this.setState({
      nodeColor: 'darkgray'
    })
  }

  onTouchEnd(e){
    e.preventDefault()
    //console.log('node:', this.node)
    this.setState({
      nodeColor: 'white'
    })
    this.props.onClick()
  }

  onTouchMove(e){
    e.preventDefault()
  }

  componentDidMount(){
    this.node.addEventListener('touchstart', this.onTouchStart)
    this.node.addEventListener('touchend', this.onTouchEnd)
    this.node.addEventListener('touchmove', this.onTouchMove)
  }

  componentWillUnmount(){
    this.node.removeEventListener('touchstart', this.onTouchStart)
    this.node.removeEventListener('touchend', this.onTouchEnd)
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
      <span
        style = {{
          display: 'inline-block',
          verticalAlign: 'middle',
          lineHeight: '2.5rem',
          fontSize: '1.2rem'
        }}
      >
        {this.props.title}
      </span>
      <hr/>
    </div>
  }
}

export default ItemBarButton
