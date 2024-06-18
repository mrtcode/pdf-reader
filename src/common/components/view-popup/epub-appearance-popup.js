import React from 'react';
import cx from 'classnames';

import IconRevert from '../../../../res/icons/16/revert.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import { DEFAULT_EPUB_APPEARANCE as DEFAULTS } from '../../../dom/epub/defines';

function EPUBAppearancePopup({ params, onChange, onClose }) {
	const intl = useIntl();

	if (!params) {
		// Not initialized yet - wait
		return null;
	}

	function handleChange(event) {
		params[event.target.name] = parseFloat(event.target.value);
		onChange(params);
	}

	function handleRevert(name) {
		params[name] = DEFAULTS[name];
		onChange(params);
	}

	function handlePointerDown(event) {
		if (event.target.classList.contains('context-menu-overlay')) {
			onClose();
		}
	}

	return (
		<div className="context-menu-overlay" onClick={handlePointerDown}>
			<div className="epub-appearance-popup">
				<div className="row">
					<label htmlFor="line-height"><FormattedMessage id="pdfReader.epubAppearance.lineHeight"/></label>
					<input
						type="range"
						id="line-height"
						name="lineHeight"
						value={params.lineHeight}
						min="0.80"
						max="2.50"
						step="0.05"
						onChange={handleChange}
					/>
					<span className="value">{params.lineHeight}</span>
					<button
						className={cx('toolbar-button', { hidden: params.lineHeight === DEFAULTS.lineHeight })}
						aria-label={intl.formatMessage({ id: 'pdfReader.epubAppearance.lineHeight.revert' })}
						onClick={() => handleRevert('lineHeight')}
					><IconRevert/></button>
				</div>

				<div className="row">
					<label htmlFor="word-spacing"><FormattedMessage id="pdfReader.epubAppearance.wordSpacing"/></label>
					<input
						type="range"
						id="word-spacing"
						name="wordSpacing"
						value={params.wordSpacing}
						min="-100"
						max="100"
						step="5"
						onChange={handleChange}
					/>
					<span className="value">{params.wordSpacing}%</span>
					<button
						className={cx('toolbar-button', { hidden: params.wordSpacing === DEFAULTS.wordSpacing })}
						aria-label={intl.formatMessage({ id: 'pdfReader.epubAppearance.wordSpacing.revert' })}
						onClick={() => handleRevert('wordSpacing')}
					><IconRevert/></button>
				</div>

				<div className="row">
					<label htmlFor="letter-spacing"><FormattedMessage id="pdfReader.epubAppearance.letterSpacing"/></label>
					<input
						type="range"
						id="letter-spacing"
						name="letterSpacing"
						value={params.letterSpacing}
						min="-0.1"
						max="0.1"
						step="0.005"
						onChange={handleChange}
					/>
					<span className="value">{params.letterSpacing * 1000}%</span>
					<button
						className={cx('toolbar-button', { hidden: params.letterSpacing === DEFAULTS.letterSpacing })}
						aria-label={intl.formatMessage({ id: 'pdfReader.epubAppearance.letterSpacing.revert' })}
						onClick={() => handleRevert('letterSpacing')}
					><IconRevert/></button>
				</div>
			</div>
		</div>
	);
}

export default EPUBAppearancePopup;
