import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TabView, TabPanel } from 'primereact/tabview';

export class AppConfig extends Component {

	static defaultProps = {
		layoutMode: 'static',
		darkMenu: true,
		profileMode: 'inline',
		version: 'v3',
		layoutColor: 'blue',
		themeColor: 'blue',
		configDialogActive: false
	}

	static propTypes = {
		layoutMode: PropTypes.string.isRequired,
		darkMenu: PropTypes.bool.isRequired,
		profileMode: PropTypes.string.isRequired,
		version: PropTypes.string.isRequired,
		layoutColor: PropTypes.string.isRequired,
		themeColor: PropTypes.string.isRequired,
		configDialogActive: PropTypes.bool.isRequired
	}

	render() {
		let layoutFlatColors = [
			{name: 'Blue', file: 'blue', image: 'blue.png'},
			{name: 'Purple', file: 'purple', image: 'purple.png'},
			{name: 'Cyan', file: 'cyan', image: 'cyan.png'},
			{name: 'Indigo', file: 'indigo', image: 'indigo.png'},
			{name: 'Teal', file: 'teal', image: 'teal.png'},
			{name: 'Pink', file: 'pink', image: 'pink.png'},
			{name: 'Lime', file: 'lime', image: 'lime.png'},
			{name: 'Green', file: 'green', image: 'green.png'},
			{name: 'Amber', file: 'amber', image: 'amber.png'},
			{name: 'Brown', file: 'brown', image: 'brown.png'},
			{name: 'Orange', file: 'orange', image: 'orange.png'},
			{name: 'Deep Purple', file: 'deeppurple', image: 'deeppurple.png'},
			{name: 'Light Blue', file: 'lightblue', image: 'lightblue.png'},
			{name: 'Light Green', file: 'lightgreen', image: 'lightgreen.png'},
			{name: 'Dark Grey', file: 'darkgrey', image: 'darkgrey.png'}
		];

		let layoutSpecialColors = [
			{name: 'Influenza', file: 'influenza', image: 'influenza.png'},
			{name: 'Suzy', file: 'suzy', image: 'suzy.png'},
			{name: 'Calm', file: 'calm', image: 'calm.png'},
			{name: 'Crimson', file: 'crimson', image: 'crimson.png'},
			{name: 'Night', file: 'night', image: 'night.png'},
			{name: 'Skyline', file: 'skyline', image: 'skyline.png'},
			{name: 'Sunkist', file: 'sunkist', image: 'sunkist.png'},
			{name: 'Little Leaf', file: 'littleleaf', image: 'littleleaf.png'},
			{name: 'Joomla', file: 'joomla', image: 'joomla.png'},
			{name: 'Firewatch', file: 'firewatch', image: 'firewatch.png'},
		];

		let themeColors = [
			{name: 'Blue', file: 'blue', image: 'blue.svg'},
			{name: 'Cyan', file: 'cyan', image: 'cyan.svg'},
			{name: 'Indigo', file: 'indigo', image: 'indigo.svg'},
			{name: 'Purple', file: 'purple', image: 'purple.svg'},
			{name: 'Teal', file: 'teal', image: 'teal.svg'},
			{name: 'Orange', file: 'orange', image: 'orange.svg'},
			{name: 'Deep Purple', file: 'deeppurple', image: 'deeppurple.svg'},
			{name: 'Light Blue', file: 'lightblue', image: 'lightblue.svg'},
			{name: 'Green', file: 'green', image: 'green.png'},
			{name: 'Light Green', file: 'lightgreen', image: 'lightgreen.png'},
			{name: 'Lime', file: 'lime', image: 'lime.svg'},
			{name: 'Amber', file: 'amber', image: 'amber.png'},
			{name: 'Brown', file: 'brown', image: 'brown.png'},
			{name: 'Dark Grey', file: 'darkgrey', image: 'darkgrey.svg'},
			{name: 'Pink', file: 'pink', image: 'pink.svg'}
		];

		return (
			<div className={classNames("layout-config", {'layout-config-active': this.props.configDialogActive})} onClick={this.props.onConfigClick}>
				<div className="layout-config-content">
					<button className="layout-config-button" id="layout-config-button" onClick={this.props.onConfigButtonClick}>
						<i className="pi pi-cog"/>
					</button>

					<button className="layout-config-close" onClick={this.props.onConfigCloseClick}>
						<i className="pi pi-times"/>
					</button>

					<TabView>
						<TabPanel header="Menu">
							<h1>Menu Modes</h1>
							<div className="panel-items">
								<div className="panel-item">
									<button className="p-link" onClick={event => this.props.changeMenuMode({ originalEvent: event, layoutMode: 'static' })}>
										<img src="assets/layout/images/configurator/menu/avalon-static.png" alt="avalon"/>
										{this.props.layoutMode === 'static' && <i className="pi pi-check"/>}
									</button>
									<span>Static</span>
								</div>
								<div className="panel-item">
									<button className="p-link" onClick={event => this.props.changeMenuMode({ originalEvent: event, layoutMode: 'overlay' })}>
										<img src="assets/layout/images/configurator/menu/avalon-overlay.png" alt="avalon"/>
										{this.props.layoutMode === 'overlay' && <i className="pi pi-check"/>}
									</button>
									<span>Overlay</span>
								</div>
								<div className="panel-item">
									<button className="p-link" onClick={event => this.props.changeMenuMode({ originalEvent: event, layoutMode: 'horizontal' })}>
										<img src="assets/layout/images/configurator/menu/avalon-horizontal.png" alt="avalon"/>
										{this.props.layoutMode === 'horizontal' && <i className="pi pi-check"/>}
									</button>
									<span>Horizontal</span>
								</div>
								<div className="panel-item">
									<button className="p-link" onClick={event => this.props.changeMenuMode({ originalEvent: event, layoutMode: 'slim' })}>
										<img src="assets/layout/images/configurator/menu/avalon-slim.png" alt="avalon"/>
										{this.props.layoutMode === 'slim' && <i className="pi pi-check"/>}
									</button>
									<span>Slim</span>
								</div>
							</div>

							<h1>Menu Colors</h1>
							<div className="panel-items">
								<div className="panel-item">
									<button className="p-link" onClick={event => this.props.changeMenuColor({ originalEvent: event, darkMenu: true })}>
										<img src="assets/layout/images/configurator/menu/avalon-dark.png" alt="avalon"/>
										{this.props.darkMenu === true && <i className="pi pi-check"/>}
									</button>
									<span>Dark</span>
								</div>
								<div className="panel-item">
									<button className="p-link" onClick={event => this.props.changeMenuColor({ originalEvent: event, darkMenu: false })}>
										<img src="assets/layout/images/configurator/menu/avalon-static.png" alt="avalon"/>
										{this.props.darkMenu === false && <i className="pi pi-check"/>}
									</button>
									<span>Light</span>
								</div>
							</div>
						</TabPanel>

						<TabPanel header="User Profile">
							<div className="panel-items">
								<div className="panel-item">
									<button className={classNames("p-link", {'p-disabled': this.props.layoutMode === 'horizontal'})}
											onClick={event => this.props.changeProfileMode({ originalEvent: event, profileMode: 'inline' })}>
										<img src="assets/layout/images/configurator/menu/avalon-inline.png" alt="avalon"/>
										{this.props.profileMode === 'inline' && <i className="pi pi-check"/>}
									</button>
									<span>Inline</span>
								</div>
								<div className="panel-item">
									<button className={classNames("p-link", {'p-disabled': this.props.layoutMode === 'horizontal'})}
											onClick={event => this.props.changeProfileMode({ originalEvent: event, profileMode: 'top' })}>
										<img src="assets/layout/images/configurator/menu/avalon-popup.png" alt="avalon"/>
										{this.props.profileMode === 'top' && <i className="pi pi-check"/>}
									</button>
									<span>Overlay</span>
								</div>
							</div>
						</TabPanel>

						<TabPanel header="Bootstrap">
							<div className="panel-items">
								<div className="panel-item">
									<button className="p-link" onClick={event => this.props.changeVersion({ originalEvent: event, version: 'v3' })}>
										<img src="assets/layout/images/configurator/v3/avalon-bootstrap3.png" alt="avalon"/>
										{this.props.version === 'v3' && <i className="pi pi-check"/>}
									</button>
									<span>V3</span>
								</div>
								<div className="panel-item">
									<button className="p-link" onClick={event => this.props.changeVersion({ originalEvent: event, version: 'v4' })}>
										<img src="assets/layout/images/configurator/v4/avalon-bootstrap4.png" alt="avalon"/>
										{this.props.version === 'v4' && <i className="pi pi-check"/>}
									</button>
									<span>V4</span>
								</div>
							</div>
						</TabPanel>

						<TabPanel header="Layout">
							<h1>Flat</h1>
							<div className="panel-items">
								{layoutFlatColors && layoutFlatColors.map((f, index) => {
									return <div className="panel-item colors" key={index}>
										<button className="p-link layout-config-layout-option" onClick={event => this.props.changeLayout({ originalEvent: event, layout: f.file})}>
											<img src={"assets/layout/images/configurator/" + this.props.version + "/layouts/flat/" + f.image} alt={f.name}/>
											{this.props.layoutColor === f.file && <i className="pi pi-check"/>}
										</button>
									</div>
								})
								}
							</div>

							<h1>Special</h1>
							<div className="panel-items">
								{layoutSpecialColors && layoutSpecialColors.map((s, index) => {
									return <div className="panel-item colors" key={index}>
										<button className="p-link layout-config-layout-option" onClick={event => this.props.changeLayout({ originalEvent: event, layout: s.file, special: true})}>
											<img src={"assets/layout/images/configurator/" + this.props.version + "/layouts/special/" + s.image} alt={s.name}/>
											{this.props.layoutColor === s.file && <i className="pi pi-check"/>}
										</button>
									</div>
								})
								}
							</div>
						</TabPanel>

						<TabPanel header="Themes">
							<div className="panel-items">
								{themeColors && themeColors.map((t, index) => {
									return <div className="panel-item" key={index}>
										<button className="p-link layout-config-option" onClick={event => this.props.changeTheme({ originalEvent: event, theme: t.file})}>
											<img src={"assets/layout/images/configurator/" + this.props.version + "/themes/" + t.image} alt={t.name}/>
											{this.props.themeColor === t.file && <i className="pi pi-check"/>}
										</button>
									</div>
								})
								}
							</div>
						</TabPanel>
					</TabView>
				</div>
			</div>
		);
	}
}
