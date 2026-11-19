# Waypoint - genere la voix off de la video d'introduction avec la voix francaise de Windows.
# Lancer depuis le dossier Waypoint :
#   powershell -ExecutionPolicy Bypass -File .\outils\voix.ps1
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$fr = $synth.GetInstalledVoices() | Where-Object { $_.Enabled -and $_.VoiceInfo.Culture.Name -like 'fr*' }
if (-not $fr) {
  Write-Host "Aucune voix francaise installee." -ForegroundColor Red
  Write-Host "Parametres > Heure et langue > Langue > Ajouter une langue > Francais (Canada), avec l'option Synthese vocale. Puis relance ce script."
  exit 1
}
# Priorite au francais du Canada
$voix = ($fr | Sort-Object { if ($_.VoiceInfo.Culture.Name -eq 'fr-CA') { 0 } else { 1 } } | Select-Object -First 1).VoiceInfo.Name
$synth.SelectVoice($voix)
$synth.Rate = 0
Write-Host "Voix utilisee : $voix" -ForegroundColor Green

$phrases = @(
  "Vous venez d'arriver dans un nouveau pays.",
  "Nouvelles règles. Nouveaux papiers. Et une seule question : par où commencer ?",
  "Voici Waypoint.",
  "Trois questions : d'où tu viens, où tu arrives, qui tu es. Et Waypoint construit ton parcours, dans le bon ordre.",
  "Pour chaque étape : quoi apporter, combien de temps, et où aller, juste à côté de chez toi.",
  "Tes documents restent sur ton téléphone. Et Waypoint te prévient avant qu'ils expirent.",
  "Des vidéos TikTok et YouTube de gens qui l'ont déjà fait. Et ta progression, à partager en un geste.",
  "Et même sans internet, Waypoint t'accompagne. Parce que le jour où tu en as le plus besoin, tu n'as pas encore de forfait.",
  "Waypoint. Ta nouvelle vie, une étape à la fois. Bientôt sur Google Play et l'App Store."
)

$dossier = Join-Path $PSScriptRoot "..\voix"
New-Item -ItemType Directory -Force -Path $dossier | Out-Null
for ($i = 0; $i -lt $phrases.Count; $i++) {
  $fichier = Join-Path $dossier ("voix{0:D2}.wav" -f ($i + 1))
  $synth.SetOutputToWaveFile($fichier)
  $synth.Speak($phrases[$i])
  Write-Host ("  {0}/{1}  {2}" -f ($i + 1), $phrases.Count, $fichier)
}
$synth.SetOutputToNull()
$synth.Dispose()
Write-Host "Termine. Les 9 fichiers sont dans le dossier 'voix'." -ForegroundColor Green
