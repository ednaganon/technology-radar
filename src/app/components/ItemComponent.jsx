import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Item from '../class/Item';
import Color from 'color';

export default class ItemComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        };

        this.onClickModal = this.onClickModal.bind(this);
    }

    static get propTypes() {
        return {
            item: PropTypes.instanceOf(Item),
        };
    }

    onClickModal(e) {
        if (!e.currentTarget.classList.contains('uk-modal') || e.target === e.currentTarget) {
            this.setState((prevState) => ({
                modalOpen: !prevState.modalOpen,
            }));
    
            document.body.classList.toggle('uk-modal-page');
        }
    }

    get labelStyle() {
        return {
            background: Color(this.props.item.category.color).darken(0.15)
        };
    }

    tags() {
        return _.map(this.props.item.tags, (tag, key) => (
            <span key={key}><div className="uk-label" style={this.labelStyle}>{tag}</div>&nbsp;</span>
        ));
    }

    renderCard() {
        return (
            <a className="uk-card uk-card-default uk-card-hover" onClick={this.onClickModal}>
                <div className="uk-card-body">
                    <div className="uk-card-badge uk-label" style={this.labelStyle}>{this.props.item.status}</div>
                    <h3 className="uk-card-title">{this.props.item.name}</h3>
                    <p className="uk-card-description">{this.props.item.description}</p>
                </div>
                <div className="uk-card-footer">
                    {this.tags()}
                </div>
            </a>
        );
    }

    renderModal() {
        return (
            <div className={`uk-modal ${this.state.modalOpen ? 'uk-open' : ''}`} onClick={this.onClickModal}>
                <div className="uk-modal-dialog">
                    <a className="uk-close uk-modal-close-default" onClick={this.onClickModal}>
                        <i className="fa fa-close" aria-hidden="true"></i>
                    </a>
                    <div className="uk-modal-header">
                        <h3 className="uk-modal-title">{this.props.item.name}</h3>
                    </div>
                    <div className="uk-modal-body">
                        <div className="uk-modal-badge uk-label" style={this.labelStyle}>{this.props.item.status}</div>
                        <p className="uk-modal-description">{this.props.item.description}</p>
                        <a target="_blank" rel="noopener noreferrer" {...this.props.item.url ? { href: this.props.item.url } : {}}><i className="fa fa-globe"></i>website</a>
                    </div>
                    <div className="uk-modal-footer">
                        {this.tags()}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                { this.renderCard() }
                { this.renderModal() }
            </div>
        );
    }

}
