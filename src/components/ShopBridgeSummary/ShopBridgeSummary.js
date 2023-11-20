import { Typography } from '@material-ui/core';

import {
    SUMMARY,
    SUMMARY_HEADING,
    SUMMARY_SUB_HEADING,
} from '../../constants/appConstants';

import './ShopBridgeSummary.scss';

const ShopBridgeSummary = () => {
    return (
        <section className="summary-container">
            <Typography variant="h4">
                {SUMMARY_HEADING}
            </Typography>
            <Typography variant="h5">
                {SUMMARY_SUB_HEADING}
            </Typography>
            <Typography variant="body1">
                {SUMMARY}
            </Typography>
        </section>
    );
};

export default ShopBridgeSummary;