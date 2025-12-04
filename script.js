// ====== ELEMENT REFERENCES ======
const videoUpload = document.getElementById('videoUpload');
const uploadedFiles = document.getElementById('uploadedFiles');
const clipsContainer = document.getElementById('clipsContainer');
const preview = document.getElementById('preview');
const resolutionSelect = document.getElementById('resolution');
const formatSelect = document.getElementById('format');

let clips = [];

// ====== NAVIGATION FUNCTIONS ======
function goToUpload() {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

function goToEditor() {
    if(clips.length === 0){
        alert('Upload at least one clip to continue.');
        return;
    }
    document.getElementById('editor').scrollIntoView({ behavior: 'smooth' });
}

function goToExport() {
    document.getElementById('export').scrollIntoView({ behavior: 'smooth' });
}

// ====== UPLOAD FUNCTION ======
videoUpload.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    clips = clips.concat(files);

    // Update uploaded files display
    uploadedFiles.innerHTML = '';
    clips.forEach((file, index) => {
        const div = document.createElement('div');
        div.textContent = `${index + 1}. ${file.name}`;
        uploadedFiles.appendChild(div);
    });

    // Also add to timeline container
    updateTimeline();
});

// ====== TIMELINE UPDATE ======
function updateTimeline() {
    clipsContainer.innerHTML = '';
    if(clips.length === 0){
        clipsContainer.textContent = 'No clips added yet.';
        return;
    }

    clips.forEach((clip, index) => {
        const clipDiv = document.createElement('div');
        clipDiv.className = 'timeline-clip';
        clipDiv.textContent = clip.name;
        clipDiv.onclick = () => playClip(index);
        clipsContainer.appendChild(clipDiv);
    });
}

// ====== PREVIEW FUNCTION ======
function playClip(index) {
    const file = clips[index];
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.play();
}

// ====== TOOLS PLACEHOLDERS ======
function trimClip() {
    alert('Trim feature coming soon!');
}

function splitClip() {
    alert('Split feature coming soon!');
}

function deleteClip() {
    const index = prompt('Enter clip number to delete:');
    const i = parseInt(index) - 1;
    if(i >= 0 && i < clips.length){
        clips.splice(i, 1);
        updateTimeline();
    }
}

function addTransition() {
    alert('Transition feature coming soon!');
}

function adjustSpeed() {
    alert('Speed adjustment coming soon!');
}

// ====== EXPORT FUNCTION ======
function exportVideo() {
    if(clips.length === 0){
        alert('Add at least one clip to export.');
        return;
    }
    const resolution = resolutionSelect.value;
    const format = formatSelect.value;
    alert(`Exporting ${clips.length} clip(s) as ${resolution}p ${format}.\n(Feature coming soon)`);
}