import { Typography } from '@material-ui/core';

import {
    SUMMARY,
    SUMMARY_HEADING,
    SUMMARY_SUB_HEADING,
} from '../../constants/appConstants';

import './ShopBridgeSummary.scss';

const ShopBridgeSummary = () => {
    return (
        <section className="sb-summary-container">
            <Typography variant="h4" className="sb-summary-block">
                {SUMMARY_HEADING}
            </Typography>
            <Typography variant="h5" className="sb-summary-block">
                {SUMMARY_SUB_HEADING}
            </Typography>
            <Typography variant="body1" className="sb-summary-block">
                {SUMMARY}
            </Typography>
        </section>
    );
};

export default ShopBridgeSummary;