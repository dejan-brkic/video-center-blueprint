import React, { Component } from "react";
import { connect } from "react-redux";

import { getDescriptor } from '@craftercms/redux';

import FooterHolder from './FooterStyle';

class Footer extends Component {
    componentWillMount() {
        this.footerUrl = "/site/components/footer.xml"
        this.props.getDescriptor(this.footerUrl);
    }
    
    renderFooterNav(nav) {
        if(Object.keys(nav).length === 0 && nav.constructor === Object){
            return null;
        }
        return nav.item.map((entry, i) => {
            return (
                <a key={ i } className="footer__link" target="_blank">{ entry.title }</a>
            );
        });
    }

    renderFooterContent(descriptor) {
        const currentYear = new Date().getFullYear(),
              updatedCopyright = descriptor.component.copyrightLabel.replace('{year}', currentYear); 

        return(
            <div className="footer__content">
                <div className="footer__copyright">
                    { updatedCopyright }
                </div>

                <div className="footer__nav">
                    { descriptor.component.nav &&
                        this.renderFooterNav(descriptor.component.nav)     
                    }
                </div>
            </div>
        );
    }

    render() {
        return (
            <FooterHolder>
                <footer className="footer">
                    { this.props.descriptors && this.props.descriptors[this.footerUrl] &&
                        this.renderFooterContent(this.props.descriptors[this.footerUrl])
                    }
                </footer>
            </FooterHolder>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getDescriptor: url => dispatch(getDescriptor(url))
})

const mapStateToProps = store => ({
    descriptors: store.craftercms.descriptors.entries
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer);