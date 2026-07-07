export const siteConfig = {
  title: "John Mark & Sandra",

  projectName: "Project Reverie",

  tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

  wedding: {
    date: new Date("2028-02-10T14:00:00+08:00"),
    dateFormatted: "February 10, 2028",
    ceremony: {
      venue: "Don Bosco Chapel on the Hill",
      address: "Tagaytay City, Cavite",
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
      address: "Tagaytay City, Cavite",
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
        description: "May include travel between venues.",
      },
      {
        start: "5:30 PM",
        end: "8:00 PM",
        duration: "2 hrs 30 min",
        title: "Reception",
        venue: "Narra Hill",
        description: "Estimated reception proper — dinner, dancing, and celebration.",
      },
    ],
  },

  rsvp: {
    deadline: "To be announced",
    message:
      "We can't wait to celebrate with you. Use the invitation code on your invite to RSVP — it only takes a minute.",
    buttonLabel: "RSVP with invitation code",
    note: "Scan the QR code on your invitation, or enter your code below.",
    fields: [
      "Will you be attending?",
      "Message for the couple",
    ],
  },

  faq: [
    {
      question: "How do I RSVP?",
      answer:
        "Your invitation includes a personal RSVP link or QR code. You can also scroll to the RSVP section and enter your invitation code. If you’ve already responded, you can update your answer anytime before the deadline.",
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
        "Yes, parking is available at both the chapel and reception venue. ",
    },
    {
      question: "Where should we stay?",
      answer:
        "Tagaytay has many wonderful hotels and bed-and-breakfasts. We recommend booking early, especially for the weekend of our wedding.",
    },
    {
      question: "Do you have a gift registry?",
      answer:
        "Your presence is the greatest gift. If you wish to give something more, a contribution to our honeymoon fund would be deeply appreciated.",
    },
  ],

  theme: {
    watercolor: true,
    paperTexture: true,
  },
} as const;
