import Invite from "components/Invite";
import React from "react";
import PropTypes from "prop-types";

const getImageSrc = (imagePath) => {
    const imagePrefix = 'https://eastyler-static.s3.amazonaws.com/media/';
    return imagePrefix + imagePath;
}

const About = () => {
    const mainSectionStyle = {
      backgroundImage: "url(./static/main-section-bg2.png)",
      backgroundRepeat: "round repeat",
      marginTop: "1px",
      paddingTop: "150px",
      paddingBottom: "200px",
    }
    const titleStyle = {
        fontFamily: "Quando",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "2.5",
    }
    const footerTitleStyle = {
        fontFamily: "Quando",
        fontStyle: "normal",
        fontWeight: "normal",
    }
    const footerIntroStyle = {
        color:"#A9ABAC",
    }
    const homeContainerStyle = {
        maxWidth: "960px",
        padding: "25px 0",
    }
    const reverseColumnStyle = {
        flexDirection: "row-reverse",
    }
    const featureTitleStyle = {
        marginLeft: "20px",
    }
    const footerColumnHeader = {
        textTransform: "uppercase",
        color: "#444F60",
        fontSize: "1rem",
        fontWeight: "500",
        marginBottom: "20px",
    }
    const interSectionStyle = {
        backgroundColor: "#fafafa",
    }
    const tagFeatureStyle = {
        maxHeight: "500px",
    }
    return (
        <div>
            <section className="section" style={mainSectionStyle}>
                <div className="container">
                    <div className="columns">
                        <div className="column is-8 is-offset-2 has-text-centered">
                            <h1 className="title big-title text-bold is-2" style={titleStyle}>
                                Eastyler
                            </h1>
                            <div className="subtitle light-subtitle">
                                Create and Explore Interactive Shoppable Looks.
                                <br/>
                                Built for social influencers and everyday fashion lovers.
                            </div>
                             <div>
                                <Invite />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section" >
                <div className="container" style={homeContainerStyle}>
                    <div className="columns is-vcentered" >
                        <div className="column is-4 is-offset-1">
                            <div className="minimal-feature">
                                <div className="is-vertical-aligned is-flex"><img src="/static/icon_tag.svg"></img><h2 className="title is-2 minimal-title" style={featureTitleStyle}>Tag</h2></div>
                                <br/>
                                <p className="feature-content">
                                    Upload your favorite looks and tag products. 
                                    <br/>
                                    The interactive tags allow Eastylers to visually explore your looks with convenience.
                                </p>
                            </div>
                        </div>
                        <div className="column is-6 is-offset-1">
                            <div className="minimal-feature-image">
                                <a href="https://www.eastyler.com/looks/YEqo2maz" target="_blank"><img src="./static/tag_feature.gif" alt="" style={tagFeatureStyle}/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
            <section className="section" style={interSectionStyle} >
                <div className="container" style={homeContainerStyle}>
                    <div className="columns is-vcentered" style={reverseColumnStyle}>
                        <div className="column is-4 is-offset-1">
                            <div className="minimal-feature">
                                <div className="is-vertical-aligned is-flex"><img src="/static/icon_share.svg"></img><h2 className="title is-2 minimal-title" style={featureTitleStyle}>Share</h2></div>
                                <br/>
                                <p className="feature-content">
                                    Use embedded social plugins to share your favoritel looks to major social networks.
                                </p>
                            </div>
                        </div>
                        <div className="column is-6 is-offset-1">
                            <div className="minimal-feature-image">
                                <img className="main-image" src="./static/share_feature.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section" >
                <div className="container" style={homeContainerStyle}>
                    <div className="columns is-vcentered">
                        <div className="column is-4 is-offset-1">
                            <div className="minimal-feature">
                                <div className="is-vertical-aligned is-flex"><img src="/static/icon_manage.svg"></img><h2 className="title is-2 minimal-title" style={featureTitleStyle}>Manage</h2></div>
                                <br/>
                                <p className="feature-content">
                                    Organize your looks and closet in a centralized console. Get inspired for your next new look.
                                </p>
                            </div>
                        </div>
                        <div className="column is-6 is-offset-1">
                            <div className="minimal-feature-image">
                                <img className="main-image" src="./static/manage_feature.gif" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section" style={interSectionStyle}>
                <div className="container" style={homeContainerStyle}>
                    <div className="columns">
                        <div className="column is-8 is-offset-2 has-text-centered">
                            <h1 className="title big-title text-bold is-4">
                                Join Eastyler to create your first look!
                            </h1>
                             <div>
                                <Invite />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer footer-light-medium">
                <div className="container" style={homeContainerStyle}>
                    <div className="columns">
                        <div className="column is-4">
                            <div className="mb-20">
                            <h1 className="title big-title text-bold is-3" style={footerTitleStyle}>
                                Eastyler
                            </h1>
                                <div className="footer-description pt-10" style={footerIntroStyle}>
                                    Estyler is built by a group of tech savvy in silicon valley who believe apparel shopping experience can be made different.
                                </div>
                            </div>
                        </div>
                        <div className="column is-6 is-offset-2">
                            <div className="columns">
                                <div className="column">
                                    <ul className="footer-column">
                                        <li className="column-header" style={footerColumnHeader}>
                                            Company
                                        </li>
                                        <li className="column-item"><a href="./About">About Us</a></li>
                                        <li className="column-item"><a href="./doc/press">Press</a></li>
                                        <li className="column-item"><a href="./doc/investor">Investor Relations</a></li>
                                    </ul>
                                </div>
                                <div className="column">
                                    <ul className="footer-column">
                                        <li className="column-header" style={footerColumnHeader}>
                                            Resources
                                        </li>
                                        <li className="column-item"><a href="./doc/help">Help Center</a></li>
                                        <li className="column-item"><a href="./doc/contact">Contact Us</a></li>
                                    </ul>
                                </div>
                                <div className="column">
                                    <ul className="footer-column">
                                        <li className="column-header" style={footerColumnHeader}>
                                            Terms
                                        </li>
                                        <li className="column-item"><a href="./doc/terms">Terms of Service</a></li>
                                        <li className="column-item"><a href="./doc/terms">Copyrights</a></li>
                                        <li className="column-item"><a href="./doc/terms">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
};
About.propTypes = {
};
export default About;