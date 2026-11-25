/**
 * সেবা মুক্ত স্কাউট গ্রুপ, সিরাজগঞ্জ — প্রধান স্ক্রিপ্ট (JavaScript)
 * বাংলাদেশ স্কাউটস অনুমোদিত মুক্ত স্কাউট দলের পোর্টাল
 * কার্যকারিতা: স্কাউটিং সময়রেখা ফিল্টারিং, স্কাউটে যোগদানের আবেদন ফরম,
 * কাউন্টার অ্যানিমেশন, গ্যালারি ও থিম নিয়ন্ত্রণ।
 */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================================================
  // ১. ইউটিলিটি ফাংশন (বাংলা সংখ্যা রূপান্তর ও টোকেন তৈরি)
  // ==========================================================================
  function bn(n) {
    return String(n).replace(/\d/g, function (d) {
      return "০১২৩৪৫৬৭৮৯"[d];
    });
  }

  function generateScoutToken() {
    var randomNum = Math.floor(1000 + Math.random() * 9000);
    return "SMSG-SCOUT-২০২৬-" + bn(randomNum);
  }

  // ==========================================================================
  // ২. স্কাউটিং কার্যক্রম ডাটাবেজ (৪৪টি প্রামাণ্য কার্যক্রম ২০২৪–২০২৬)
  // ==========================================================================
  var C = {
    s: "⚜️ ক্যাম্প ও হাইকিং",
    j: "📻 জাম্বুরি ও সমাবেশ",
    c: "🤝 স্কাউট কমিউনিটি সেবা",
    p: "🌱 পরিবেশ ও বৃক্ষরোপণ",
    d: "🎖️ বিপি দিবস ও র‍্যালি"
  };

  var A = [
    // ২০২৪ সাল
    ["৩০ মার্চ ২০২৪", "সুবিধাবঞ্চিত শিশুদের মুখে হাসি ফোটাতে স্কাউটদের ঈদ উপহার বিতরণ", "c", "স্কাউটদের নিজস্ব সঞ্চয় ও সহযোগিতায় সুবিধাবঞ্চিত শিশুদের মাঝে পোশাক উপহার প্রদান।"],
    ["১২ এপ্রিল ২০২৪", "যমুনা নদীর শহর রক্ষা বাঁধে বিশেষ স্কাউট পরিচ্ছন্নতা অভিযান", "p", "প্লাস্টিক বর্জ্য অপসারণ ও যমুনার পাড়ে সচেতনতামূলক সাইনবোর্ড স্থাপন।"],
    ["২৫ এপ্রিল ২০২৪", "চরাঞ্চলের দরিদ্র পরিবারের জন্য নিরাপদ খাবার পানির ব্যবস্থা", "c", "স্কাউট সোশ্যাল সার্ভিস প্রজেক্টের অধীনে ১৬তম গভীর নলকূপ স্থাপন।"],
    ["১০ মে ২০২৪", "সিরাজগঞ্জ পৌর এলাকায় ডেঙ্গু প্রতিরোধে স্কাউট সচেতনতা ক্যাম্পেইন", "p", "নাগরিক সচেতনতায় লিফলেট বিতরণ ও জলাবদ্ধ স্থানে লার্ভিসাইড প্রয়োগ।"],
    ["২২ মে ২০২৪", "১ম বিনামূল্যে চক্ষু সেবা ও প্রাথমিক স্বাস্থ্য ক্যাম্প পরিচালনা", "c", "৮২০ জন সুবিধাবঞ্চিত মানুষকে বিনামূল্যে চক্ষু পরীক্ষা ও ওষুধ বিতরণ।"],
    ["২৮ মে ২০২৪", "চক্ষু ক্যাম্পের ৮৫ জন জটিল ছানি রোগীর সফল লেন্স প্রতিস্থাপন", "c", "বিএনএসবি চক্ষু হাসপাতালের সহযোগিতায় স্কাউটারদের সরাসরি তত্ত্বাবধানে অপারেশন।"],
    ["১০ জুন ২০২৪", "বিশ্ব পরিবেশ দিবসে সিরাজগঞ্জ সরকারি কলেজে বৃক্ষরোপণ উৎসব", "p", "ফলদ, বনজ ও ওষধি গাছের চারা রোপণ এবং শিক্ষার্থীদের মাঝে চারা বিতরণ।"],
    ["২০ জুন ২০২৪", "বন্যা দুর্যোগ মোকাবেলায় স্কাউট রেসকিউ টিম গঠন ও মক ড্রিল", "s", "বর্ষায় যমুনার চরাঞ্চলে জরুরি উদ্ধারকাজের জন্য রোভার স্কাউটদের বিশেষ প্রশিক্ষণ।"],
    ["০৫ জুলাই ২০২৪", "যমুনার চরাঞ্চলে বন্যাকবলিত ১২০ পরিবারের মাঝে শুকনো খাবার বিতরণ", "c", "চিঁড়া, গুড়, খাবার স্যালাইন ও পানি বিশুদ্ধকরণ ট্যাবলেট বিতরণ।"],
    ["২০ জুলাই ২০২৪", "বন্যার পানি নেমে যাওয়ার পর চরাঞ্চলে ১৭তম গভীর নলকূপ স্থাপন", "c", "পানিবাহিত রোগ প্রতিরোধে বিশুদ্ধ খাবার পানির স্থায়ী সংস্থান।"],
    ["১৫ আগস্ট ২০২৪", "জাতীয় শোক দিবসে স্কাউটদের স্বেচ্ছায় রক্তদান ও স্বাস্থ্য পরীক্ষা", "c", "সিরাজগঞ্জ শহরে সাধারণ মানুষের রক্তের গ্রুপ নির্ণয় ও স্বেচ্ছায় রক্তদান।"],
    ["০৮ সেপ্টেম্বর ২০২৪", "আন্তর্জাতিক সাক্ষরতা দিবসে সুবিধাবঞ্চিত শিশুদের শিক্ষা উপকরণ বিতরণ", "c", "খাতা, কলম ও প্রাথমিক বই উপহার প্রদান।"],
    ["২১ সেপ্টেম্বর ২০২৪", "বিশ্ব শান্তি দিবস উপলক্ষে সিরাজগঞ্জ শহরে বর্ণাঢ্য স্কাউট র‍্যালি", "d", "শান্তি, সম্প্রীতি ও ভ্রাতৃত্ববোধের বার্তা নিয়ে শহর প্রদক্ষিণ।"],
    ["১৯ অক্টোবর ২০২৪", "৬৭তম আন্তর্জাতিক জাম্বুরি অন দ্য এয়ার ও অন দ্য ইন্টারনেট (JOTA-JOTI)", "j", "বিশ্বের বিভিন্ন দেশের স্কাউটদের সাথে রেডিও ও অনলাইনে তথ্য ও ভ্রাতৃত্ব বিনিময়।"],
    ["০৫ নভেম্বর ২০২৪", "অসহায় নারীদের আত্মনির্ভরশীল করতে স্কাউটদের সেলাই মেশিন প্রদান", "c", "স্বাবলম্বী পরিবার গঠনে ৫টি সেলাই মেশিন বিতরণ।"],
    ["২০ নভেম্বর ২০২৪", "সিরাজগঞ্জ জেলা কার্যালয়ে স্কাউট প্রাথমিক চিকিৎসা (First Aid) কর্মশালা", "s", "সিপিআর, ব্যান্ডেজিং ও স্ট্রেচার তৈরির ব্যবহারিক প্রশিক্ষণ।"],
    ["০৫ ডিসেম্বর ২০২৪", "আন্তর্জাতিক স্বেচ্ছাসেবক দিবসে পথশিশুদের নিয়ে বিশেষ দুপুরের আহার", "c", "পথশিশুদের মাঝে উষ্ণতা ও ভালোবাসার বার্তা পৌঁছে দেওয়া।"],
    ["১৫ ডিসেম্বর ২০২৪", "যমুনার চরের শীতার্ত ৩০০ প্রবীণ ও শিশুর মাঝে কম্বল বিতরণ", "c", "তীব্র শীতে চরাঞ্চলের মানুষের মাঝে উষ্ণতার ছোঁয়া।"],
    ["২৫ ডিসেম্বর ২০২৪", "সেবা মুক্ত স্কাউট গ্রুপের বার্ষিক শীতকালীন গ্রুপ ক্যাম্প ও দীক্ষা", "s", "নতুন কাব ও স্কাউটদের শপথ গ্রহণ, তাবু বাস, হাইকিং ও বর্ণাঢ্য ক্যাম্পফায়ার।"],

    // ২০২৫ সাল
    ["১০ জানুয়ারি ২০২৫", "কাজীপুর চরাঞ্চলে শীতার্তদের মাঝে ২য় দফায় জ্যাকেট ও শাল বিতরণ", "c", "দুর্গম চরে ঘরে ঘরে গিয়ে শীতের ভারী পোশাক পৌঁছে দেওয়া।"],
    ["২৫ জানুয়ারি ২০২৫", "নদীভাঙনে নিঃস্ব অসহায় পরিবারের জন্য ১ম নিরাপদ ঘর নির্মাণ", "c", "টিনশেড পাকা ভিত্তিসম্পন্ন নিরাপদ আশ্রয়ের চাবি হস্তান্তর।"],
    ["১২ ফেব্রুয়ারি ২০২৫", "স্কাউট প্রতিষ্ঠাতা বিপি দিবস ও বিশ্ব স্কাউট দিবস উদযাপন", "d", "আলোচনা সভা, স্কাউট স্কিল প্রদর্শনী ও স্কাউট সংগীত সন্ধ্যা।"],
    ["২৮ ফেব্রুয়ারি ২০২৫", "২য় বিনামূল্যে চক্ষু ক্যাম্প — ১,১৫০ জন রোগীকে সেবা প্রদান", "c", "চোখের চিকিৎসায় ৪০০ জন রোগীর মাঝে বিনামূল্যে প্রেসক্রিপশন চশমা বিতরণ।"],
    ["০৬ মার্চ ২০২৫", "চক্ষু ক্যাম্পের ১৭০ জন ছানি রোগীর সফল লেন্স প্রতিস্থাপন অপারেশন", "c", "এ এম ফস্টার কেয়ার ও বিএনএসবি চক্ষু হাসপাতালের সহযোগিতায় সম্পন্ন।"],
    ["২১ মার্চ ২০২৫", "পবিত্র রমজানে সুবিধাবঞ্চিত রোজাদারদের মাঝে ইফতার সামগ্রী উপহার", "c", "তেল, ডাল, ছোলা ও খেজুর সম্বলিত খাদ্যপ্যাকেট বিতরণ।"],
    ["০৫ এপ্রিল ২০২৫", "সুবিধাবঞ্চিত শিশুদের জন্য ঈদ আনন্দ ও নতুন জামা উপহার ২০২৫", "c", "ঈদের আনন্দ সবার মাঝে ছড়িয়ে দিতে নতুন পোশাক প্রদান।"],
    ["২৫ এপ্রিল ২০২৫", "কামারখন্দ উপজেলার জামতৈল বাজারে ১৮তম গভীর নলকূপ উদ্বোধন", "c", "পথচারী ও স্থানীয়দের জন্য সুপেয় খাবার পানির সংস্থান।"],
    ["১৫ মে ২০২৫", "স্কাউট পায়োনিয়ারিং ও ক্যাম্প গ্যাজেট নির্মাণ ৩ দিনব্যাপী কর্মশালা", "s", "দড়ি ও বাঁশের নিখুঁত ল্যাশিং ব্যবহার করে সিগন্যাল টাওয়ার ও তোরণ নির্মাণ।"],
    ["০৫ জুন ২০২৫", "সবুজ সিরাজগঞ্জ প্রকল্প: ১,০০০ ফলদ ও বনজ বৃক্ষরোপণ", "p", "পরিবেশ রক্ষায় বিভিন্ন শিক্ষাপ্রতিষ্ঠান ও শিক্ষার্থীদের চারা বিতরণ।"],
    ["২০ জুন ২০২৫", "বেলকুচির চরে নদীভাঙনে নিঃস্ব পরিবারের জন্য ২য় নিরাপদ ঘর নির্মাণ", "c", "ঘরহারা পরিবারকে মাথা গোঁজার নির্ভরযোগ্য আশ্রয় প্রদান।"],
    ["১৫ জুলাই ২০২৫", "সিরাজগঞ্জ রোড গোলচত্বরে সড়ক নিরাপত্তা ও ট্রাফিক সচেতনতা ক্যাম্প", "p", "যানবাহন চালক ও পথচারীদের ট্রাফিক নিয়ম মানতে উদ্বুদ্ধকরণ।"],
    ["১২ আগস্ট ২০২৫", "আন্তর্জাতিক যুব দিবসে তরুণ নেতৃত্ব ও আত্মউন্নয়ন সেমিনার", "s", "রোভার স্কাউটদের কর্মদক্ষতা ও ক্যারিয়ার গঠন বিষয়ক বিশেষ সেশন।"],
    ["২০ সেপ্টেম্বর ২০২৫", "নদীভাঙনে ক্ষতিগ্রস্ত চরাঞ্চলের জন্য ১৯তম গভীর নলকূপ স্থাপন", "c", "বিশুদ্ধ পানির তীব্র সংকট নিরসনে স্থায়ী নলকূপ স্থাপন।"],
    ["১০ অক্টোবর ২০২৫", "সিরাজগঞ্জ শহীদ শামসুদ্দিন স্টেডিয়ামে জেলা স্কাউট সমাবেশে অংশগ্রহণ", "j", "গ্রুপের পক্ষ থেকে কন্টিনজেন্ট পরিচালনা ও শ্রেষ্ঠ দলীয় প্রদর্শনী।"],
    ["১৭ অক্টোবর ২০২৫", "৬৮তম বিশ্ব স্কাউট জাম্বুরি JOTA-JOTI ২০২৫ এ সক্রিয় অংশগ্রহণ", "j", "তথ্যপ্রযুক্তির মাধ্যমে বিশ্ব স্কাউটিং ভ্রাতৃত্ব বিনিময়।"],
    ["০২ নভেম্বর ২০২৫", "শাহজাদপুরে নদীভাঙন কবলিত অসহায় প্রবীণ দম্পতির জন্য ৩য় নিরাপদ ঘর", "c", "অসহায় বৃদ্ধ দম্পতির মুখে নিরাপদ আশ্রয়ের হাসি।"],
    ["২৫ নভেম্বর ২০২৫", "প্লাস্টিক বর্জ্যমুক্ত সিরাজগঞ্জ শহর গড়তে জনসচেতনতা ক্যাম্পেইন", "p", "দোকানিদের পলিথিন বর্জন ও কাপড়ের ব্যাগ ব্যবহারে উদ্বুদ্ধকরণ।"],
    ["১৫ ডিসেম্বর ২০২৫", "বীর মুক্তিযোদ্ধাদের সম্মাননা ও চরাঞ্চলে শীতবস্ত্র বিতরণ", "d", "স্বাধীনতার সূর্যসন্তানদের শ্রদ্ধা জ্ঞাপন ও ২০০ কম্বল বিতরণ।"],
    ["২৬ ডিসেম্বর ২০২৫", "সেবা মুক্ত স্কাউট গ্রুপের ৩৯তম প্রতিষ্ঠাবার্ষিকী ও অ্যাডভেঞ্চার হাইকিং", "s", "যমুনার বুকে ১৫ কিমি রোমাঞ্চকর হাইকিং, ওরিয়েন্টিয়ারিং ও ক্যাম্পফায়ার।"],

    // ২০২৬ সাল
    ["১০ জানুয়ারি ২০২৬", "যমুনার দুর্গম চরে ৫০০ শীতার্ত পরিবারের মাঝে শীতবস্ত্র ও কম্বল বিতরণ", "c", "হাড়কাঁপানো শীতে মানবিক ভালোবাসার হাত প্রসারিত করা।"],
    ["২৪ জানুয়ারি ২০২৬", "অসহায় পরিবারের জন্য ৪র্থ ও ৫ম নিরাপদ ঘর হস্তান্তর", "c", "পাকা মেঝেসহ দুটি নিরাপদ ঘরের চাবি আনুষ্ঠানিকভাবে প্রদান।"],
    ["১২ ফেব্রুয়ারি ২০২৬", "আমেরিকা প্রবাসী অর্থায়নে ৬ষ্ঠ নিরাপদ ঘর 'স্বপ্নের ঠিকানা' উদ্বোধন", "c", "ভূমিহীন ও স্বামীহারা বিধবার জন্য স্থায়ী নিরাপদ ছাদ।"],
    ["২০ ফেব্রুয়ারি ২০২৬", "কামারখন্দ ও সদর চরাঞ্চলে ২০ ও ২১তম গভীর নলকূপ স্থাপন", "c", "আর্সেনিক ও ক্ষতিকর ধাতুমুক্ত নিরাপদ খাবার পানি নিশ্চিতকরণ।"],
    ["০১ মার্চ ২০২৬", "৩য় বিনামূল্যে চক্ষু শিবির — ১,২০০ চক্ষু পরীক্ষা ও ২৩৭ ছানি অপারেশন", "c", "৪৪৫টি চশমা বিতরণ এবং আধুনিক লেন্স প্রতিস্থাপন সম্পন্ন।"]
  ];

  // ==========================================================================
  // ৩. টাইমলাইন ফিল্টারিং লজিক (বছর, ক্যাটেগরি ও লাইভ সার্চ)
  // ==========================================================================
  var currentYear = "all";
  var currentCat = "all";
  var searchQuery = "";

  var ysBox = document.getElementById("ys");
  var csBox = document.getElementById("cs");
  var searchInput = document.getElementById("q");
  var clearSearchBtn = document.getElementById("clearSearch");
  var cntDisplay = document.getElementById("cnt");

  function createFilterBar(container, items, onClick) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach(function (item) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = item[1];
      btn.dataset.val = item[0];
      btn.onclick = function () {
        onClick(item[0]);
        renderTimeline();
      };
      container.appendChild(btn);
    });
  }

  createFilterBar(
    ysBox,
    [
      ["all", "সব বছর"],
      ["২০২৪", "২০২৪"],
      ["২০২৫", "২০২৫"],
      ["২০২৬", "২০২৬"]
    ],
    function (val) {
      currentYear = val;
    }
  );

  var catOptions = [["all", "সব ধরন"]];
  Object.keys(C).forEach(function (k) {
    catOptions.push([k, C[k]]);
  });

  createFilterBar(csBox, catOptions, function (val) {
    currentCat = val;
  });

  function renderTimeline() {
    if (ysBox) {
      ysBox.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.val === currentYear ? "true" : "false");
      });
    }
    if (csBox) {
      csBox.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.val === currentCat ? "true" : "false");
      });
    }

    var qLower = searchQuery.toLowerCase().trim();

    var filtered = A.filter(function (item) {
      var dateStr = item[0];
      var titleStr = item[1];
      var catKey = item[2];
      var descStr = item[3] || "";
      var catLabel = C[catKey] || "";

      var yearMatch = currentYear === "all" || dateStr.indexOf(currentYear) !== -1;
      var catMatch = currentCat === "all" || catKey === currentCat;
      var textMatch = !qLower ||
        dateStr.toLowerCase().indexOf(qLower) !== -1 ||
        titleStr.toLowerCase().indexOf(qLower) !== -1 ||
        descStr.toLowerCase().indexOf(qLower) !== -1 ||
        catLabel.toLowerCase().indexOf(qLower) !== -1;

      return yearMatch && catMatch && textMatch;
    });

    var displayList = filtered.slice().reverse();

    if (cntDisplay) {
      cntDisplay.textContent = bn(displayList.length) + "টি কার্যক্রম দেখানো হচ্ছে";
    }

    var tlList = document.getElementById("tl");
    if (!tlList) return;

    if (displayList.length === 0) {
      tlList.innerHTML = "<li style='padding:20px;text-align:center;color:var(--mut)'>কোনো কার্যক্রম খুঁজে পাওয়া যায়নি। অন্য শব্দ বা বছর দিয়ে খুঁজুন।</li>";
      return;
    }

    tlList.innerHTML = displayList
      .map(function (item) {
        var date = item[0];
        var title = item[1];
        var cat = item[2];
        var desc = item[3];
        return (
          "<li>" +
          "<time>" + date + "</time>" +
          "<h3>" + title + "<span class='tag'>" + (C[cat] || cat) + "</span></h3>" +
          (desc ? "<p>" + desc + "</p>" : "") +
          "</li>"
        );
      })
      .join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchQuery = this.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchQuery ? "block" : "none";
      }
      renderTimeline();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      if (searchInput) {
        searchInput.value = "";
        searchQuery = "";
      }
      clearSearchBtn.style.display = "none";
      renderTimeline();
    });
  }

  renderTimeline();

  // ==========================================================================
  // ৪. ডায়নামিক স্কাউট পরিসংখ্যান কাউন্টার (Intersection Observer সহ)
  // ==========================================================================
  function runCounters() {
    var counters = document.querySelectorAll("[data-n]");
    counters.forEach(function (el) {
      var target = parseInt(el.dataset.n, 10);
      if (isNaN(target)) return;
      var start = 0;
      var step = Math.max(1, Math.round(target / 40));
      var timer = setInterval(function () {
        start += step;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        el.textContent = bn(start);
      }, 25);
    });
  }

  var statsSec = document.querySelector(".stats-section");
  if (statsSec && "IntersectionObserver" in window) {
    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCounters();
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    statsObserver.observe(statsSec);
  } else {
    runCounters();
  }

  // ==========================================================================
  // ৫. স্কাউটে যোগদানের আবেদন ফরম হ্যান্ডলার
  // ==========================================================================
  var scoutForm = document.getElementById("scoutJoinForm");
  if (scoutForm) {
    scoutForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var branch = document.getElementById("scoutBranch").value;
      var nameBn = document.getElementById("scoutNameBn").value.trim();
      var nameEn = document.getElementById("scoutNameEn").value.trim();
      var dob = document.getElementById("scoutDob").value;
      var gender = document.getElementById("scoutGender").value;
      var phone = document.getElementById("scoutPhone").value.trim();
      var institute = document.getElementById("scoutInstitute").value.trim();
      var guardian = document.getElementById("scoutGuardian").value.trim();
      var guardianPhone = document.getElementById("scoutGuardianPhone").value.trim();
      var upazila = document.getElementById("scoutUpazila").value;
      var address = document.getElementById("scoutAddress").value.trim();
      var declare = document.getElementById("scoutDeclare").checked;

      if (!branch || !nameBn || !nameEn || !dob || !gender || !phone || !institute || !guardian || !guardianPhone || !upazila || !address || !declare) {
        showModal("সতর্কতা", "দয়া করে লাল তারকা চিহ্নিত (*) সকল ঘর এবং স্কাউট অঙ্গীকারনামা পূরণ করুন।", null, "⚠️");
        return;
      }

      var applicationData = {
        branch: branch,
        nameBn: nameBn,
        nameEn: nameEn,
        dob: dob,
        gender: gender,
        phone: phone,
        institute: institute,
        guardian: guardian,
        guardianPhone: guardianPhone,
        upazila: upazila,
        address: address,
        submittedAt: new Date().toISOString()
      };

      var apps = JSON.parse(localStorage.getItem("smsg_scout_applications") || "[]");
      apps.unshift(applicationData);
      localStorage.setItem("smsg_scout_applications", JSON.stringify(apps));

      scoutForm.reset();

      var token = generateScoutToken();
      showModal(
        "স্বাগতম বাংলাদেশ স্কাউটসে!",
        "ধন্যবাদ " + nameBn + "! সেবা মুক্ত স্কাউট গ্রুপে " + branch + " শাখায় আপনার আবেদন সফলভাবে গৃহীত হয়েছে। আমাদের দলীয় সমন্বয়ক শীঘ্রই সাক্ষাৎকার ও দলীয় প্যারেডের সূচি আপনাকে জানিয়ে দেবেন।",
        token,
        "⚜️"
      );
    });
  }

  // ==========================================================================
  // ৬. সাধারণ যোগাযোগ ও পরিদর্শন অনুরোধ ফরম
  // ==========================================================================
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("conName").value.trim();
      var phone = document.getElementById("conPhone").value.trim();
      var subject = document.getElementById("conSubject").value;
      var message = document.getElementById("conMessage").value.trim();

      if (!name || !phone || !subject || !message) {
        showModal("সতর্কতা", "দয়া করে আপনার নাম, মোবাইল নম্বর, বিষয় ও বার্তা লিখুন।", null, "⚠️");
        return;
      }

      contactForm.reset();

      showModal(
        "বার্তা সফলভাবে পৌঁছেছে",
        "ধন্যবাদ " + name + "! আপনার বার্তাটি গ্রুপ স্কাউট লিডার (GSL) ও কাউন্সিলের কাছে প্রেরণ করা হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।",
        null,
        "✉️"
      );
    });
  }

  // ==========================================================================
  // ৭. রোভার স্কাউট প্রোগ্রাম ট্যাব নিয়ন্ত্রণ
  // ==========================================================================
  var programTabs = document.querySelectorAll(".pg-tab-btn");
  var programPanels = document.querySelectorAll(".pg-panel");

  programTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      programTabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      programPanels.forEach(function (p) {
        p.classList.remove("active");
      });

      this.classList.add("active");
      this.setAttribute("aria-selected", "true");
      var targetId = this.dataset.tab;
      var targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });

  // ==========================================================================
  // ৮. মডাল নিয়ন্ত্রণ
  // ==========================================================================
  var modal = document.getElementById("feedbackModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalMessage = document.getElementById("modalMessage");
  var modalIcon = document.getElementById("modalIcon");
  var modalTokenBox = document.getElementById("modalTokenBox");
  var modalTokenCode = document.getElementById("modalTokenCode");

  function showModal(title, message, token, icon) {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalMessage) modalMessage.textContent = message;
    if (modalIcon) modalIcon.textContent = icon || "⚜️";

    if (token && modalTokenBox && modalTokenCode) {
      modalTokenBox.style.display = "block";
      modalTokenCode.textContent = token;
    } else if (modalTokenBox) {
      modalTokenBox.style.display = "none";
    }

    modal.classList.add("show");
  }

  window.closeModal = function () {
    if (modal) modal.classList.remove("show");
  };

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // ==========================================================================
  // ৯. ডার্ক/লাইট থিম নিয়ন্ত্রণ
  // ==========================================================================
  var themeBtn = document.getElementById("th");
  var root = document.documentElement;

  var savedTheme = localStorage.getItem("smsg_theme");
  if (savedTheme) {
    root.dataset.theme = savedTheme;
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var isDark = root.dataset.theme === "dark" ||
        (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var nextTheme = isDark ? "light" : "dark";
      root.dataset.theme = nextTheme;
      localStorage.setItem("smsg_theme", nextTheme);
    });
  }

  // ==========================================================================
  // ১০. মোবাইল মেনু ও স্ক্রল টু টপ
  // ==========================================================================
  var menuBtn = document.getElementById("mb");
  var nav = document.getElementById("nv");
  var upBtn = document.getElementById("up");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("o");
      menuBtn.classList.toggle("active", isOpen);
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("o");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  window.addEventListener("scroll", function () {
    if (upBtn) {
      upBtn.style.display = window.scrollY > 400 ? "block" : "none";
    }
  });

  if (upBtn) {
    upBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
