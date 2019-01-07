import React from "react";

import { Affix, Menu, Icon, Divider, Input } from "antd";
import logo from "./img/antd-logo.svg";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

// <Menu.Item key="mail">
// 									<Icon type="mail" />
// 									Navigation One
// 								</Menu.Item>
// 								<Menu.Item key="app" disabled>
// 									<Icon type="appstore" />
// 									Navigation Two
// 								</Menu.Item>
// 								<SubMenu
// 									title={
// 										<span className="submenu-title-wrapper">
// 											<Icon type="cloud" />
// 											名作大赏
// 										</span>
// 									}
// 								>
// 									<MenuItemGroup>
// 										<Menu.Item key="setting:1">Option 1</Menu.Item>
// 										<Menu.Item key="setting:2">Option 2</Menu.Item>
// 										<Menu.Item key="setting:3">Option 3</Menu.Item>
// 										<Menu.Item key="setting:4">Option 4</Menu.Item>
// 									</MenuItemGroup>
// 								</SubMenu>
// 								<SubMenu
// 									title={
// 										<span className="submenu-title-wrapper">
// 											<Icon type="cloud" />
// 											开源项目快查
// 										</span>
// 									}
// 								>
// 									<MenuItemGroup>
// 										<Menu.Item key="setting:1">Option 1</Menu.Item>
// 										<Menu.Item key="setting:2">Option 2</Menu.Item>
// 										<Menu.Item key="setting:3">Option 3</Menu.Item>
// 										<Menu.Item key="setting:4">Option 4</Menu.Item>
// 									</MenuItemGroup>
// 								</SubMenu>
// 								<Menu.Item key="alipay">
// 									<a
// 										href="https://ant.design"
// 										target="_blank"
// 										rel="noopener noreferrer"
// 									>
// 										Navigation Four - Link
// 									</a>
// 								</Menu.Item>

export default class extends React.Component {
	state = {
		top: 0,
		current: "mail",
		db: {}
	};

	componentDidMount() {
		import("./db.js").then(db => {
			this.setState({
				db: db.default
			});
		});
	}

	render() {
		console.log(db);
		const { db } = this.state;

		const { topMenu = [], topMenuIcons=[] } = db;

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
								{topMenu.map((item, i) => {
									if (!item.children)
										return <Menu.Item key={item.title}><Icon type={topMenuIcons[i]}/>{item.title}</Menu.Item>;
									else {
										return (
											<SubMenu key={item.title} title={<span><Icon type={topMenuIcons[i]}/>{item.title}</span>}>
												<MenuItemGroup>
													{item.children.map((_item, _i) => {
														return <Menu.Item key={_item.title}>{_item.title}</Menu.Item>;
													})}
												</MenuItemGroup>
											</SubMenu>
										);
									}
								})}
							</Menu>
						</div>
					</div>
				</Affix>
			</div>
		);
	}
}
