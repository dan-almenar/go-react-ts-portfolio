package biodata

import (
	"encoding/json"
	"io"
)

type langData struct {
	Title             string `json:"title"`
	Subtitle          string `json:"subtitle"`
	ShortDescription  string `json:"shortDescription"`
	Path              string `json:"path"`
	LastAchievement   string `json:"lastAchievement"`
	ProfessionalGoals string `json:"professionalGoals"`
}

type Bio struct {
	Common struct {
		GitHub   string
		LinkedIn string
	}
	English langData
	Spanish langData
}

func (b *Bio) FromJSON(r io.Reader) error {
	return json.NewDecoder(r).Decode(b)
}

func (b *Bio) ToJSON(w io.Writer) error {
	return json.NewEncoder(w).Encode(b)
}
