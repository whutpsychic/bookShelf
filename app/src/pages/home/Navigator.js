import React from "react";

import { Affix, Menu, Icon, Divider, Input } from "antd";

import logo from "./img/antd-logo.svg";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

export default class extends React.Component {
	state = {
		top: 0,
		current: "mail"
	};

	componentDidMount() {}

	render() {
		return (
			<div>
				<header className="home-header" />
				<Affix top={this.state.top}>
					<div className="top-bar">
						<div className="left-top-logo">
							<img alt="antd-logo" src={logo} />
							<p style={{ fontSize: "2em" }}>Ant Design</p>
							<Divider type="vertical" />
							<div className="top-searcher">
								<Search
									placeholder="input search text"
									enterButton="Search"
									onSearch={value => console.log(value)}
								/>
							</div>
							<Divider type="vertical" />
						</div>

						<div className="top-menu-container">
							<Menu
								onClick={this.handleClick}
								selectedKeys={[this.state.current]}
								mode="horizontal"
							>
								<Menu.Item key="mail">
									<Icon type="mail" />
									Navigation One
								</Menu.Item>
								<Menu.Item key="app" disabled>
									<Icon type="appstore" />
									Navigation Two
								</Menu.Item>
								<SubMenu
									title={
										<span className="submenu-title-wrapper">
											<Icon type="setting" />
											Navigation Three - Submenu
										</span>
									}
								>
									<MenuItemGroup title="Item 1">
										<Menu.Item key="setting:1">Option 1</Menu.Item>
										<Menu.Item key="setting:2">Option 2</Menu.Item>
									</MenuItemGroup>
									<MenuItemGroup title="Item 2">
										<Menu.Item key="setting:3">Option 3</Menu.Item>
										<Menu.Item key="setting:4">Option 4</Menu.Item>
									</MenuItemGroup>
								</SubMenu>
								<Menu.Item key="alipay">
									<a
										href="https://ant.design"
										target="_blank"
										rel="noopener noreferrer"
									>
										Navigation Four - Link
									</a>
								</Menu.Item>
							</Menu>
						</div>
					</div>
				</Affix>
			</div>
		);
	}
}
