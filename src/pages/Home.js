import React from "react";
import "../index.css";
const Home = () => {
	return (
		<div className="body">
			<div className="center">
				<div className="avatar">
					<img
						src="https://www.mitti.se/_internal/cimg!0/f58r1gt8drfhp4maarsb4ascgadla12.jpeg"
						alt="backgroundimg"
					/>
				</div>

				<div className="content">
					<h1 className="h1">Elahe Eskandari</h1>
					<h2 className="h3">Frontend developer</h2>

					<p className="pDescription">
						Frontend developer looking for a place to grow as well as leading
						the frontend development forward. I believe my positive attitude and
						willingness to learn has brought the best in me and inspired others
						around me in the same way. The two things I value the most in carrer
						are the chance to grow/develop and to have a good team at work. I
						feel a constant hunger for growth and want to feel better than I was
						yesterday. My collauges would describe me as helpful, determined and
						good at maintaining calm and focused during high stress.
					</p>
				</div>
			</div>
		</div>
	);
};
export default Home;
