import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>
                <h3>Frontend</h3>
                <button type="submit" className="btn btn-primary btn-block">Conectar a backend</button>
                <div className="form-group">
                    <label>Respuesta del backend</label>
                </div>
            </form>
        );
    }
}
