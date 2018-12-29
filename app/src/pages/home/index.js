import React from "react";
import "./style.scss";

import Navigator from './Navigator';


import { Zboard } from "../../components";
import pic1 from "../../media/images/1.jpg";
import pic2 from "../../media/images/2.jpg";
import pic3 from "../../media/images/3.jpg";

export default class extends React.Component {
	state = {
		top: 0
	};

	render() {
		return (
			<div className="home">
				<Navigator/>
				<div className="home-body">
					<section className="home-board">
			
					</section>
					<section className="home-board">
				
					</section>
					<section className="home-board">
				
					</section>
					<section className="home-board">
				
					</section>
				</div>
			</div>
		);
	}
}
