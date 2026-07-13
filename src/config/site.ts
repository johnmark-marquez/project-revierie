export const siteConfig = {
  title: "Sandra & John Mark",

  projectName: "Project Reverie by John Mark Marquez",

  tagline: "We celebrate the oldest and deepest magic of all: Love",

  /**
   * Soft launch: homepage is Hero + Save the Date + Celebrate CTA.
   * Flip to false when you’re ready for the full invitation site.
   */
  saveTheDateOnly: true,

  /** Show the Our Story section on the full homepage (ignored when saveTheDateOnly is true). */
  showOurStory: true,

  /** Show the Prenup gallery section on the full homepage (ignored when saveTheDateOnly is true). */
  showPrenup: true,

  story: {
    eyebrow: "Our Story",
    title: "Our Story",
    description: "Every love story is beautiful, but ours is our favorite.",
    /** Each milestone needs title + description. `when` is optional. */
    milestones: [
      {
        when: "2006",
        title: "Every Witch and Wizard Has an Origin Story",
        description:
          "Met at high school and became friends since then.",
      },
      { 
        when: "2018",
        title: "After All This Time?",
        description:
          "Reconnected and started dating.",
      },
      {
        when: "April 26, 2026",
        title: "Always",
        description:
          "She said yes!",
      },
      {
        when: "February 10, 2028",
        title: "Mischief Managed",
        description:
          "The next chapter — and we would love for you to be there.",
      },
    ],
  },

  wedding: {
    date: new Date("2028-02-10T14:00:00+08:00"),
    dateFormatted: "February 10, 2028",
    locationShort: "Tagaytay · Batangas",
    ceremony: {
      venue: "Don Bosco Chapel on the Hill",
      address: "Batulao Rd, Nasugbu, Batangas",
      time: "2:00 PM",
      image: "/venues/chapel-on-the-hill.jpg",
      imageAlt:
        "Don Bosco Chapel on the Hill, a circular glass chapel overlooking Tagaytay",
      mapsUrl:
        "https://maps.google.com/?q=Don+Bosco+Chapel+on+the+Hill+Tagaytay",
      wazeUrl:
        "https://ul.waze.com/ul?venue_id=79167629.791938430.1565906&overview=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
    },
    reception: {
      venue: "Narra Hill",
      address: "Brgy Niyugan, Laurel, Batangas",
      time: "5:30 PM",
      image: "/venues/narra-hill.jpg",
      imageAlt: "Narra Hill pavilion with gardens and views of Taal Lake",
      mapsUrl: "https://maps.google.com/?q=Narra+Hill+Tagaytay",
      wazeUrl:
        "https://ul.waze.com/ul?venue_id=79233165.792200576.14776236&overview=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
    },
    itinerary: [
      {
        start: "2:00 PM",
        end: "3:00 PM",
        duration: "1 hr",
        title: "Ceremony proper",
        venue: "Don Bosco Chapel on the Hill",
        description:
          "Join us as we exchange vows overlooking the hills of Tagaytay.",
      },
      {
        start: "3:30 PM",
        end: "5:30 PM",
        duration: "2 hrs",
        title: "Cocktails",
        venue: "Narra Hill",
        description: "May include travel between venues. May also include drinking and socializing. ",
      },
      {
        start: "5:30 PM",
        end: "8:00 PM",
        duration: "2 hrs 30 min",
        title: "Reception",
        venue: "Narra Hill",
        description: "Estimated reception proper — dinner, laughter, and celebration.",
      },
    ],
  },

  rsvp: {
    deadline: "November 10, 2027",
    message:
      "We can't wait to celebrate with you. Use the invitation code on your invite to RSVP — it only takes a minute.",
    buttonLabel: "RSVP with invitation code",
    note: "Scan the QR code on your invite, or enter your code below.",
    fields: [
      "Will you be attending?",
      "Number of guests attending",
      "Guest name(s) for those with more than 1 guest",
      "Outfit color (each color can be chosen by up to two guests)",
      "Message for the couple",
    ],
  },

  faq: [
    {
      question: "Why is the wedding on a Thursday?",
      answer: "We chose this date because it is a good date for us since our anniversary as a couple is also on the 10th, but in March."
    },
    {
      question: "How do I RSVP?",
      answer:
        "Your invitation includes a personal RSVP that is linked via QR code or to an invitation code. You can also scroll to the RSVP section and enter your invitation code. If you’ve already responded, you can update your answer anytime before the deadline.",
    },
    {
      question: "What is the dress code?",
      answer:
        "Our only rule is that you wear wedding-appropriate attire. Guests can come in any color as long as no shorts, no slippers, no jeans and no white for ladies.",
    },
    {
      question: "Can I bring a plus-one or my children?",
      answer:
        "The invitation will indicate if a plus-one or children are included. If you’re unsure, contact us. Please note that our wedding will be an adults-only event, except for children who are part of our entourage and immediate family.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, parking is available at both the chapel and reception venue. There is a dedicated parking area on the Narra Hill venue for guests while for the chapel, it may be a bit challenging to find parking since only street parking is available, we suggest to arrive early to secure a spot.",
    },
    {
      question: "Where should we stay?",
      answer:
        "Tagaytay has many wonderful hotels and bed-and-breakfasts. We recommend booking early, especially if you plan to stay the night before or after the wedding.",
    },
    {
      question: "Do you have a gift registry?",
      answer:
        "Your presence is the greatest gift. If you wish to give something more, a contribution to our honeymoon fund would be deeply appreciated. You may scan either QR code below.",
      qrCodes: [
        {
          name: "John Mark Marquez",
          image: "/gifts/john-mark-unionbank-qr.png",
          imageAlt: "UnionBank QR code for John Mark Marquez",
        },
        {
          name: "Sandra Pizarras Honorio",
          image: "/gifts/sandra-unionbank-qr.png",
          imageAlt: "UnionBank QR code for Sandra Pizarras Honorio",
        },
      ],
    },
  ],

  theme: {
    watercolor: true,
    paperTexture: true,
  },

  /** Drop photos in public/prenup/ and set each `image` path when ready. */
  prenup: {
    eyebrow: "Prenup",
    title: "Before the big day",
    description:
      "A few favorites from our prenup session — more coming soon as we finish selecting photos.",
    photos: [
      {
        id: "featured",
        alt: "Sandra and John Mark during their prenup shoot",
        caption: "Our favorite shot — coming soon",
        featured: true,
        tint: "mist",
      },
      {
        id: "laughing",
        alt: "Sandra and John Mark laughing together",
        caption: "Coming soon",
        tint: "rose",
      },
      {
        id: "walking",
        alt: "Sandra and John Mark walking hand in hand",
        caption: "Coming soon",
        tint: "sage",
      },
      // {
      //   id: "portrait",
      //   alt: "Close-up portrait of Sandra and John Mark",
      //   caption: "Coming soon",
      //   tint: "lavender",
      // },
    ],
  },
} as const;
