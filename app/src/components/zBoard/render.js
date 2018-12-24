//上一次维护日期: 2018-12-24

import React from "react";

export default class extends React.Component {
	state = {
		Items: [],
		current: 1,
		intervalKey: null,
		isDragging: false,
		startX: 0,
		endX: 0
	};

	componentDidMount() {
		const { children, defaultShow, scrollTime } = this.props;

		this.setState({
			Items: children || [],
			current: defaultShow
		});

		this.checkLoop();
	}

	componentWillUnmount() {
		window.clearInterval(this.state.intervalKey);
	}

	render() {
		const { Items, current } = this.state;
		// const { startX, endX } = this.state;

		const stylePosition = {
			marginLeft: "-" + (current - 1) + "00%",
			transitionDuration: ".6s",
			transitionTimingFunction: "cubic-bezier(.06,.88,.07,.99)"
		};

		const { showNextPreBtns, showSelectBtns } = this.props;

		//显示下一个上一个按钮
		const renderNextPreBtns = bool => {
			if (bool)
				return (
					<div>
						<div
							className="zBoard-btn zBoard-toprevious"
							onClick={this.previousItem}
						/>
						<div className="zBoard-btn zBoard-tonext" onClick={this.nextItem} />
					</div>
				);
			return null;
		};

		//显示底部按钮组
		const renderSelectBtns = (bool, Items) => {
			if (bool)
				return (
					<ul className="zBoard-itemLink" onClick={this.selectItem}>
						{React.Children.map(Items, (child, i) => {
							if (i + 1 === current) return <li key={i} className="active" />;
							return <li key={i} />;
						})}
					</ul>
				);
			return null;
		};

		return (
			<div className="zBoard-container">
				<div className="zBoard-body">
					<ul
						onMouseDown={this.startDrag}
						onMouseMove={this.dragging}
						onMouseUp={this.endDrag}
						onTouchStart={this.touchStartDrag}
						onTouchMove={this.touchMove}
						onTouchEnd={this.touchEndDrag}
					>
						{React.Children.map(Items, (child, i) => {
							if (i < 1)
								return (
									<li key={i} style={stylePosition}>
										{React.cloneElement(child, {
											style: { width: "100%", height: "100%" }
										})}
									</li>
								);
							return (
								<li key={i}>
									{React.cloneElement(child, {
										style: { width: "100%", height: "100%" }
									})}
								</li>
							);
						})}
					</ul>
				</div>
				{renderNextPreBtns(showNextPreBtns)}
				{renderSelectBtns(showSelectBtns, Items)}
			</div>
		);
	}

	//************************************
	// 新增拖拽事件组
	checkMove = (startx, endx) => {
		if (endx - startx > 100) {
			this.previousItem();
		} else if (endx - startx < -100) {
			this.nextItem();
		}
	};

	//移动端
	touchStartDrag = e => {
		//如果是有多个触摸目标则不执行动作
		if (e.targetTouches.length > 1) return;

		const target = e.targetTouches[0];
		this.setState({
			isDragging: true,
			startX: target.clientX
		});
	};

	touchMove = e => {
		const target = e.targetTouches[0];
		const { isDragging } = this.state;
		if (isDragging) {
			this.setState({
				endX: target.clientX
			});
		}
	};

	touchEndDrag = e => {
		this.setState({
			isDragging: false
		});
		this.checkMove(this.state.startX, this.state.endX);
	};

	//pc端
	startDrag = e => {
		e.preventDefault();
		this.setState({
			isDragging: true,
			startX: e.screenX
		});
	};

	dragging = e => {
		const { isDragging } = this.state;
		if (isDragging) {
			this.setState({
				endX: e.clientX
			});
		}
	};

	endDrag = e => {
		this.setState({
			isDragging: false
		});
		this.checkMove(this.state.startX, this.state.endX);
	};
	//************************************

	//检查是否要循环轮播
	checkLoop = () => {
		const { autoScroll } = this.props;
		if (autoScroll) {
			const { intervalKey } = this.state;
			if (intervalKey) window.clearTimeout(intervalKey);
			const { scrollTime } = this.props;
			let key = setTimeout(() => {
				this.nextItem();
			}, scrollTime);
			this.setState({
				intervalKey: key
			});
		}
	};

	//到上一项
	previousItem = () => {
		const { current } = this.state;
		this.upToNum(current - 1);
	};

	//到下一项
	nextItem = () => {
		const { current } = this.state;
		this.upToNum(current + 1);
	};

	//重置到第一项
	upToFirst = () => {
		this.upToNum(1);
	};

	//到最后一项
	upToEnd = () => {
		const { Items } = this.state;
		this.upToNum(Items.length);
	};

	//跳转到第几项
	upToNum = num => {
		const { Items } = this.state;
		//如果到了第一项还点上一项，跳转到最后一项
		if (num < 1) {
			this.upToEnd();
		}

		//如果到了最后一项，重置到第一项
		else if (num > Items.length) this.upToFirst();
		//跳转到第几项
		else {
			this.setState({
				current: num
			});
		}
		this.checkLoop();
	};

	//选第几个
	selectItem = e => {
		const _target = e.target;
		const getChildNumero = function(node, callback) {
			let _parent = node.parentNode;

			for (let i = 0; i < _parent.children.length; i++) {
				if (_parent.children[i] === node) {
					callback(i + 1, node);
					break;
				}
			}
		};
		if (_target.tagName.toLowerCase() === "li") {
			//获取一个子节点是其父节点的第几个子节点
			getChildNumero(_target, num => {
				this.upToNum(num);
			});
		}
	};
}
