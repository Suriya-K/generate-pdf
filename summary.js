$(document).ready(async () => {
  var elementHanlder = {
    "#editor": function (element, renderer) {
      return true;
    },
  };
  var doc = new jsPDF();
  doc.fromHTML($("#target").html(), 15, 15, {
    width: 170,
    elementHandlers: elementHanlder,
  });
  // doc.output('dataurlnewwindow');

  await assignReference();
  getDataDisplay();
});

function downloadpdf() {
  var doc = new jsPDF("p", "mm", "a4");
  var htmlRef1 = document.getElementById("content");

  window.scrollTo(0, 0);

  html2canvas(htmlRef1, {
    useCORS: true,
    allowTaint: true,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: htmlRef1.scrollHeight,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  });

  doc.save("test.pdf");
}

function getDataDisplay() {
  let summary_div1 = document.getElementById("summary_1_value");
  let summary_div2 = document.getElementById("summary_2_value");
  let summary_div3 = document.getElementById("summary_3_value");

  let recom_div1 = document.getElementById("recom_1_value");
  let recom_div2 = document.getElementById("recom_2_value");
  let recom_div3 = document.getElementById("recom_3_value");
  let recom_div4 = document.getElementById("recom_4_value");

  const summary_data1 = summary_data[0];
  const summary_data2 = summary_data[1];

  const section_1 = [
    "vit_a",
    "vit_c",
    "vit_d",
    "vit_e",
    "biotin",
    "folate",
    "iron",
    "omg3",
    "zinc",
  ];
  const section_2 = [
    "alopecia",
    "premature_gray",
    "psoriasis",
    "dry_skin",
    "insomnia",
    "premature_menopause",
  ];
  const section_3 = ["minoxidil", "finasteride", "dutasteride"];
  // summary_data[0];


  section_1.forEach((key) => {
    let p1 = document.createElement("p");
    p1.innerHTML = key + " : " + summary_data1[key];
    summary_div1.appendChild(p1);

    let p2 = document.createElement("p");
    p2.innerHTML = key + " : " + summary_data2["rec_" + key];
    recom_div1.appendChild(p2);
  });


  section_2.forEach((key) => {
    let p = document.createElement("p");
    p.innerHTML = key + " : " + summary_data1[key];
    summary_div2.appendChild(p);

    if (key == "alopecia" || key === "premature_gray") {
      let p2 = document.createElement("p");
      p2.innerHTML = key + " : " + summary_data2["rec_" + key].replace(/\^/gmi,'<br>') +"<br>ความเสี่ยง: " +summary_data1[key];
      recom_div2.appendChild(p2);
    }
    
    if (key == "psoriasis" || key === "dry_skin") {
      let p2 = document.createElement("p");
      p2.innerHTML = key + " : " + summary_data2["rec_" + key].replace(/\^/gmi,'<br>') +"<br>ความเสี่ยง: " +summary_data1[key];
      recom_div3.appendChild(p2);
    }

    if (key == "insomnia" || key === "premature_menopause") {
      let p2 = document.createElement("p");
      p2.innerHTML = key + " : " + summary_data2["rec_" + key].replace(/\^/gmi,'<br>') +"<br>ความเสี่ยง: " +summary_data1[key];
      recom_div4.appendChild(p2);
    }
  });


  section_3.forEach((key) => {
    let p = document.createElement("p");
    p.innerHTML = key + " : " + summary_data1[key];
    summary_div3.appendChild(p);
  });
}
