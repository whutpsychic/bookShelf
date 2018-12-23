import React from "react";
import "./style.scss";
import { Zboard } from "../../components";
import pic1 from "../../media/images/1.jpg";
import pic2 from "../../media/images/2.jpg";
import pic3 from "../../media/images/3.jpg";

export default class extends React.Component {
	render() {

		return (
			<div className="home">
				<header className="home-header" />
				<section className="home-board">
					<Zboard>
						<img alt="get" src={pic1} />
						<img alt="get" src={pic2} />
						<img alt="get" src={pic3} />
					</Zboard>
				</section>
			</div>
		);
	}
}
