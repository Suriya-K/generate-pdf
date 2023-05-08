const usage_code = {
  NU001: "vit_a",
  NU005: "vit_c",
  NU006: "vit_d",
  NU007: "vit_e",
  NU017: "biotin",
  NU009: "folate",
  NU011: "iron",
  NU013: "omg3",
  NU016: "zinc",
  SK013: "alopecia",
  SK018: "premature_gray",
  SK012: "psoriasis",
  SK011: "dry_skin",
  SS004: "insomnia",
  LV007: "premature_menopause",
  SK019: "minoxidil",
  SK020: "finasteride",
  SK020: "dutasteride",
};

var recommen_reference = [];
var sample_data = [];
var extract_data = {
  vit_a: "",
  vit_c: "",
  vit_d: "",
  vit_e: "",
  biotin: "",
  folate: "",
  iron: "",
  omg3: "",
  zinc: "",
  alopecia: "",
  premature_gray: "",
  psoriasis: "",
  dry_skin: "",
  insomnia: "",
  premature_menopause: "",
  minoxidil: "",
  finasteride: "",
  dutasteride: "",
};
var recom_data = {
  rec_vit_a: "",
  rec_vit_c: "",
  rec_vit_d: "",
  rec_vit_e: "",
  rec_biotin: "",
  rec_folate: "",
  rec_iron: "",
  rec_omg3: "",
  rec_zinc: "",
  rec_alopecia: "",
  rec_premature_gray: "",
  rec_psoriasis: "",
  rec_dry_skin: "",
  rec_insomnia: "",
  rec_premature_menopause: "",
};
var summary_data = [];

// const fileInput = document.getElementById("tsv")
// const readFile = (e) => {
//   const reader = new FileReader();
//   reader.onload = () => {
//     document.getElementById("out").textContent = reader.result;
//   };
//   loadSampleData(fileInput.files[0]);
//   reader.readAsBinaryString(fileInput.files[0]);
// };
// document.onreadystatechange = function () {
//   if (document.readyState === "complete") {
//     fileInput.onchange = readFile;
//   }
// };

function loadRecommandReference() {
  return new Promise((resolve) => {
    d3.tsv("./recommen_reference.tsv", function (data) {
      return data;
    }).then((d) => {
      d.forEach((element) => {
        recommen_reference.push(element);
        resolve(recommen_reference);
      });
    });
  });
}

function loadSampleData() {
  return new Promise((resolve) => {
    d3.tsv("./sample_input.tsv", function (data) {
      return data;
    }).then((d) => {
      d.forEach((element) => {
        sample_data.push(element);
        resolve(sample_data);
      });
    });
  });
}

async function assignReference() {
  await loadRecommandReference();
  await loadSampleData();
  //data["interpret.3scale"]

  sample_data.forEach((data) => {
    if (usage_code[data.code] in extract_data) {
      extract_data[usage_code[data.code]] = data["interpret.3scale"];
      // SK020 finasteride & dutasteride use same value
      extract_data['finasteride'] = extract_data['dutasteride'];
    }
  });
  recommen_reference.forEach((data) => {
    // low_rec medhigh_rec
    if (usage_code[data.code]) {
      if (extract_data[usage_code[data.code]] + "_rec" in data) {
        recom_data["rec_" + usage_code[data.code]] =
          data[extract_data[usage_code[data.code]] + "_rec"];
      }
      if ("med" + extract_data[usage_code[data.code]] + "_rec" in data) {
        recom_data["rec_" + usage_code[data.code]] =
          data["med" + extract_data[usage_code[data.code]] + "_rec"];
      }
      if (extract_data[usage_code[data.code]] + "high_rec" in data) {
        recom_data["rec_" + usage_code[data.code]] =
          data[extract_data[usage_code[data.code]] + "high_rec"];
      }
    }
  });
  summary_data.push(extract_data);
  summary_data.push(recom_data);
}

// Default export is a4 paper, portrait, using millimeters for units


