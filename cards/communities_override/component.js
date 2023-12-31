{{> cards/card_component componentName='communities_override' }}

class communities_overrideCardComponent extends BaseCard['communities_override'] {
  constructor(config = {}, systemConfig = {}) {
    super(config, systemConfig);
  }

  onMount() {
    const onVerticalFullPageMap = !!document.querySelector('.js-answersVerticalFullPageMap');
    onVerticalFullPageMap && registerVerticalFullPageMapCardListeners(this);
    super.onMount();
  }

  /**
   * This returns an object that will be called `card`
   * in the template. Put all mapping logic here.
   *
   * @param {Object} profile of the entity in the card
   */
  dataForRender(profile) {
    const linkTarget = AnswersExperience.runtimeConfig.get('linkTarget') || '_blank';

    return {
      title: profile.name, // The header text of the card
      url: profile.website || profile.landingPageUrl, // If the card title is a clickable link, set URL here
      target: linkTarget, // If the title's URL should open in a new tab, etc.
      titleEventOptions: this.addDefaultEventOptions(), // The event options for title click analytics
      // subtitle: '', // The sub-header text of the card
      hours: Formatter.openStatus(profile),
      // services: [], // Used for a comma delimited list of services for the location
      address: Formatter.address(profile) || profile.locationString || '', // The address for the card
      phone: Formatter.nationalizedPhoneDisplay(profile), // The phone number for the card
      phoneEventOptions: this.addDefaultEventOptions(), // The analytics event options for phone clicks
      distance: Formatter.toLocalizedDistance(profile), // Distance from the user’s or inputted location
      // details: profile.description, // The description for the card, displays below the address and phone
      // altText: '', // The alt-text of the displayed image
      // image: '', // The URL of the image to display on the card
      showOrdinal: true, // Show the map pin number on the card. Only supported for universal search
      CTA1: { // The primary call to action for the card
        label: 'Call', // The label of the CTA
        iconName: 'phone', // The icon to use for the CTA
        url: Formatter.phoneLink(profile), // The URL a user will be directed to when clicking
        target: linkTarget, // If the URL will be opened in a new tab, etc.
        eventType: 'TAP_TO_CALL', // Type of Analytics event fired when clicking the CTA
        eventOptions: this.addDefaultEventOptions(), // The analytics event options for CTA clicks
        // ariaLabel: '', // Accessible text providing a descriptive label for the CTA
      },
      CTA2: { // The secondary call to action for the card
        label: 'Get Directions',
        iconName: 'directions',
        url: Formatter.getDirectionsUrl(profile),
        target: linkTarget,
        eventType: 'DRIVING_DIRECTIONS',
        eventOptions: this.addDefaultEventOptions(),
        // ariaLabel: '',
      },
      CTA3: { // The secondary call to action for the card
        label: 'See Community',
        iconName: 'pin',
        url: profile.website || profile.landingPageUrl,
        target: linkTarget,
        eventType: 'VIEW_WEBSITE',
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
    return 'cards/communities_override';
  }
}

ANSWERS.registerTemplate(
  'cards/communities_override',
  {{{stringifyPartial (read 'cards/communities_override/template') }}}
);
ANSWERS.registerComponentType(communities_overrideCardComponent);
