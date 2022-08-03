import { Component } from "react";

export default class Weather extends Component {
    render() {
        return (
            <>
            {this.props.weather.map(item => {
                return (
                    <>
                    <p>{item.data} </p>
                    <p>{item.description} </p>
                    </>
                )
            })

            }     
            </>
        )
    }
}

