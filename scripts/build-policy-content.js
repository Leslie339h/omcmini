const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../static/policy/warranty-policy-extract.txt');
const out = path.join(__dirname, '../common/policy/warrantyPolicyContent.js');
const raw = fs.readFileSync(src, 'utf8');
const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

const paragraphs = [];
let buf = [];

function flushPara() {
	if (buf.length) {
		paragraphs.push({ type: 'p', text: buf.join(' ') });
		buf = [];
	}
}

for (const line of lines) {
	const isTitle =
		/^欧迈驰/.test(line) ||
		/^声明：/.test(line) ||
		/^[一二三四五六七八九十]+、/.test(line) ||
		/^保障类型/.test(line) ||
		/^GREENSEAL/.test(line) ||
		/^三、理赔范围/.test(line) ||
		/^四、不理赔/.test(line) ||
		/^五、属于制造/.test(line) ||
		/^六、下列属于/.test(line) ||
		/^七、承担责任/.test(line) ||
		/^八．/.test(line) ||
		/^九．/.test(line) ||
		/^\d{4}年/.test(line);

	if (isTitle) {
		flushPara();
		paragraphs.push({ type: line.length < 30 ? 'h2' : 'h3', text: line });
		continue;
	}
	if (/^\d+\)/.test(line) || /^（\d+）/.test(line) || /^[0-9]+\.[0-9]+/.test(line)) {
		flushPara();
		paragraphs.push({ type: 'p', text: line });
		continue;
	}
	buf.push(line);
}
flushPara();

const js =
	'export default ' +
	JSON.stringify({ title: '欧迈驰轮胎质保政策细则', paragraphs }, null, 2) +
	'\n';

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, js, 'utf8');
console.log('written', out, 'items', paragraphs.length);
