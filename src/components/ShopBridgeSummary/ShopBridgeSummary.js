import {
    SUMMARY,
    SUMMARY_HEADING,
    SUMMARY_SUB_HEADING,
} from '../../constants/appConstants';

import './ShopBridgeSummary.scss';

const ShopBridgeSummary = () => {
    return (
        <section className="summary-container">
            <h2>{SUMMARY_HEADING}</h2>
            <h3>{SUMMARY_SUB_HEADING}</h3>
            <p>{SUMMARY}</p>
        </section>
    );
};

export default ShopBridgeSummary;