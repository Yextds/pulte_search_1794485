{{> cards/card_component componentName='products_override' }}

class products_overrideCardComponent extends BaseCard['products_override'] {
  constructor(config = {}, systemConfig = {}) {
    super(config, systemConfig);
  }

  /**
   * This returns an object that will be called `card`
   * in the template. Put all mapping logic here.
   *
   * @param profile profile of the entity in the card
   */
  dataForRender(profile) {
    let imageUrl = '';
    let alternateText = '';
    if (profile.primaryPhoto) {
      imageUrl = Formatter.image(profile.primaryPhoto).url;
      alternateText = Formatter.image(profile.primaryPhoto).alternateText;
    }
    const linkTarget = AnswersExperience.runtimeConfig.get('linkTarget') || '_blank';

    var strSqFeet = profile.c_squareFeet.toString();
  
    return {
      title: profile.name, // The header text of the card
      url: profile.landingPageUrl, // If the card title is a clickable link, set URL here
      target: linkTarget, // If the title's URL should open in a new tab, etc.
      titleEventOptions: this.addDefaultEventOptions(),
      linkedcommunityname: profile.c_locationsOfferingProduct ? profile.c_locationsOfferingProduct[0].name: null,
      subtitle: (profile.price.value > 0.00) ? Formatter.price(profile.price): null, // The sub-header text of the card
      subtitle2: profile.c_bedrooms ? profile.c_bedrooms : null,
      subtitle3: profile.c_bathrooms ? profile.c_bathrooms: null,
      subtitle4: profile.c_garage ? profile.c_garage: null,
      subtitle5: strSqFeet ? (strSqFeet + " Square Feet") : null,
      image: imageUrl, // The URL of the image to display on the card
      altText: alternateText,  // The alternate text for the image
      details: profile.richTextDescription ? ANSWERS.formatRichText(profile.richTextDescription, 'richTextDescription', linkTarget) : null, // The text in the body of the card
      // tag: profile.stockStatus ? profile.stockStatus : '', // The tag text for the card
      // If the card's details are longer than a certain character count, you can truncate the
      // text. A toggle will be supplied that can show or hide the truncated text.
      // showMoreDetails: {
      //   truncatedDetails: profile.richTextDescription ? ANSWERS.formatRichText(profile.richTextDescription, 'richTextDescription', linkTarget, 350) : null, // The truncated rich text
      //   showMoreText: 'Show more', // Label when toggle will show truncated text
      //   showLessText: 'Show less' // Label when toggle will hide truncated text
      // },
      // The primary CTA of the card
      CTA1: {
        label: profile.landingPageUrl ? "Learn More" : null, // The CTA's label
        // iconName: 'chevron', // The icon to use for the CTA
        url: profile.landingPageUrl, // The URL a user will be directed to when clicking
        target: linkTarget, // Where the new URL will be opened
        eventType: 'CTA_CLICK', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      // The secondary CTA of the card
      CTA2: {
        label: profile.c_interactivePlan ? "View Interactive Plan" : null,
        // iconName: 'chevron',
        url: profile.c_interactivePlan,
        target: linkTarget,
        eventType: 'CTA_CLICK',
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '',
      },
      feedback: false, // Shows thumbs up/down buttons to provide feedback on the result card
      feedbackTextOnSubmission: 'Thanks!', // Text to display after a thumbs up/down is clicked
      positiveFeedbackSrText: 'This answered my question', // Screen reader only text for thumbs-up
      negativeFeedbackSrText: 'This did not answer my question' // Screen reader only text for thumbs-down
    };
  }

  /**
   * The template to render
   * @returns {string}
   * @override
   */
  static defaultTemplateName (config) {
    return 'cards/products_override';
  }
}

ANSWERS.registerTemplate(
  'cards/products_override',
  {{{stringifyPartial (read 'cards/products_override/template') }}}
);
ANSWERS.registerComponentType(products_overrideCardComponent);
