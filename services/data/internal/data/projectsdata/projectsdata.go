package projectsdata

import (
	"encoding/json"
	"io"
)

type ProjectDescription struct {
	Description string `json:"description"`
	Title       string `json:"title"`
}

type ProjectSchema struct {
	Image         string                 `json:"image"`
	LangsAndTools []string               `json:"langsAndTools"`
	Links         map[string]interface{} `json:"links"`
	Project       struct {
		English ProjectDescription `json:"english"`
		Spanish ProjectDescription `json:"spanish"`
	} `json:"project"`
}

func (b *ProjectSchema) FromJSON(r io.Reader) error {
	return json.NewDecoder(r).Decode(b)
}

func (b *ProjectSchema) ToJSON(w io.Writer) error {
	return json.NewEncoder(w).Encode(b)
}
