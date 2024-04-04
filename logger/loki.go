package main

import (
	logrusloki "github.com/schoentoon/logrus-loki"
	"github.com/sirupsen/logrus"
)

func getLogger() (*logrusloki.Loki, *logrus.Logger, error) {
	hook, err := logrusloki.NewLokiDefaults("http://ct-loki:3100/loki/api/v1/push")
	if err != nil {
		return nil, nil, err
	}

	log := logrus.New()
	log.AddHook(hook)

	return hook, log, nil
}
